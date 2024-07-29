import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiCaller from '@api/client';
import Config from 'react-native-config';
import logger from '@utils/logger';

export interface Headline {
  id: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
  source: {
    name: string;
  };
  author: string;
}

interface HeadlinesState {
  headlines: Headline[];
  displayedHeadlines: Headline[];
  pinnedHeadlines: Headline[];
  deletedHeadlines: Headline[];
  loading: boolean;
  error: string | null;
}

const initialState: HeadlinesState = {
  headlines: [],
  displayedHeadlines: [],
  pinnedHeadlines: [],
  deletedHeadlines: [],
  loading: false,
  error: null,
};

interface RootState {
  headlines: HeadlinesState;
}

export const fetchInitialHeadlinesAction = createAsyncThunk(
  'headlines/fetchInitialHeadlines',
  async (
    params: {apiKey: string; q: string; language: string},
    {dispatch, rejectWithValue},
  ) => {
    try {
      const response = await apiCaller({
        url: `${Config.NEWS_URL}`,
        method: 'GET',
        params: {...params, pageSize: 20, page: 1},
      });

      const initialHeadlines: Headline[] = response.articles;
      await AsyncStorage.setItem('headlines', JSON.stringify(initialHeadlines));

      // Dispatch background fetching action
      dispatch(fetchMoreHeadlinesInBackgroundAction(params));

      return initialHeadlines;
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error('Error fetching initial headlines:', error.message);
        return rejectWithValue(error.message);
      }
      logger.error('Unknown error fetching initial headlines:', error);
      return rejectWithValue('An unknown error occurred');
    }
  },
);

export const fetchMoreHeadlinesInBackgroundAction = createAsyncThunk(
  'headlines/fetchMoreHeadlinesInBackground',
  async (
    params: {apiKey: string; q: string; language: string},
    {rejectWithValue, getState},
  ) => {
    const allPages = [2, 3, 4, 5]; // Here, for element 21 to 100 will be fetched in the background, while fetchInitialHeadlinesAction will only fetch upto first 20 news elements.
    try {
      // Creating an array of promises for fetching pages
      const fetchPagePromises = allPages.map(page =>
        apiCaller({
          url: `${Config.NEWS_URL}`,
          method: 'GET',
          params: {...params, pageSize: 20, page},
        }),
      );

      // Await all the promises: Handling background fetch with promise.all
      const responses = await Promise.all(fetchPagePromises);

      // Extracting articles from each response and flatten them into a single array
      let allHeadlines: Headline[] = responses.flatMap(
        response => response.articles,
      );
      const state = getState() as RootState;
      // Merging allHeadlines with the existing headlines in the state
      const mergedHeadlines = [...state.headlines.headlines, ...allHeadlines];
      await AsyncStorage.setItem('headlines', JSON.stringify(mergedHeadlines));
      return mergedHeadlines;
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error('Error fetching more headlines:', error.message);
        return rejectWithValue(error.message);
      }
      logger.error('Unknown error fetching more headlines:', error);
      return rejectWithValue('An unknown error occurred');
    }
  },
);

// Get stored headlines from AsyncStorage
export const getStoredHeadlinesAction = createAsyncThunk(
  'headlines/getStoredHeadlines',
  async (_, {rejectWithValue}) => {
    try {
      const headlines = await AsyncStorage.getItem('headlines');
      const pinnedHeadlines = await AsyncStorage.getItem('pinnedHeadlines');
      const deletedHeadlines = await AsyncStorage.getItem('deletedHeadlines');
      // return headlines ? JSON.parse(headlines) : [];
      return {
        headlines: headlines ? JSON.parse(headlines) : [],
        pinnedHeadlines: pinnedHeadlines ? JSON.parse(pinnedHeadlines) : [],
        deletedHeadlines: deletedHeadlines ? JSON.parse(deletedHeadlines) : [],
      };
    } catch (error: unknown) {
      if (error instanceof Error) {
        logger.error('Error getting stored headlines:', error.message);
        return rejectWithValue(error.message);
      }
      logger.error('Unknown error getting stored headlines:', error);
      return rejectWithValue('An unknown error occurred');
    }
  },
);

const headlinesSlice = createSlice({
  name: 'headlines',
  initialState,
  reducers: {
    addNewHeadlines: state => {
      const remainingHeadlines = state.headlines.filter(
        h =>
          !state.displayedHeadlines.some(dh => dh.title === h.title) &&
          !state.deletedHeadlines.some(dh => dh.title === h.title),
      );
      if (remainingHeadlines.length) {
        const newBatch = remainingHeadlines.slice(0, 5);
        state.displayedHeadlines = [...newBatch, ...state.displayedHeadlines];
      } else {
        // Handle exhaustion of headlines
        AsyncStorage.removeItem('headlines');
        AsyncStorage.removeItem('pinnedHeadlines');
        AsyncStorage.removeItem('deletedHeadlines');
        state.headlines = []; // Clear current headlines
        state.displayedHeadlines = []; // Clear displayed headlines
        state.pinnedHeadlines = []; // Clear pinned headlines
        state.deletedHeadlines = []; // Clear deleted headlines
      }
    },
    pinHeadline: (state, action) => {
      const headline = action.payload;
      if (!state.pinnedHeadlines.some(h => h.title === headline.title)) {
        state.pinnedHeadlines = [headline];
        AsyncStorage.setItem(
          'pinnedHeadlines',
          JSON.stringify(state.pinnedHeadlines),
        );
      } else {
        state.pinnedHeadlines = [];
        AsyncStorage.removeItem('pinnedHeadlines');
      }
    },
    deleteHeadline: (state, action) => {
      const headline = action.payload;
      state.deletedHeadlines = [...state.deletedHeadlines, headline];
      state.displayedHeadlines = state.displayedHeadlines.filter(
        h => h.title !== headline.title,
      );
      state.headlines = state.headlines.filter(h => h.title !== headline.title);
      state.pinnedHeadlines = state.pinnedHeadlines.filter(
        h => h.title !== headline.title,
      );
      AsyncStorage.setItem(
        'deletedHeadlines',
        JSON.stringify(state.deletedHeadlines),
      );
      AsyncStorage.setItem('headlines', JSON.stringify(state.headlines));
      AsyncStorage.setItem(
        'pinnedHeadlines',
        JSON.stringify(state.pinnedHeadlines),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInitialHeadlinesAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInitialHeadlinesAction.fulfilled, (state, action) => {
        state.headlines = action.payload;
        state.displayedHeadlines = action.payload.slice(0, 10);
        state.loading = false;
      })
      .addCase(fetchInitialHeadlinesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
      .addCase(fetchMoreHeadlinesInBackgroundAction.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchMoreHeadlinesInBackgroundAction.fulfilled,
        (state, action) => {
          state.headlines = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        fetchMoreHeadlinesInBackgroundAction.rejected,
        (state, action) => {
          state.loading = false;
          state.error = action.error.message || 'An error occurred';
        },
      )
      .addCase(getStoredHeadlinesAction.pending, state => {
        state.loading = true;
      })
      .addCase(getStoredHeadlinesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.headlines = action.payload.headlines;
        state.pinnedHeadlines = action.payload.pinnedHeadlines;
        state.deletedHeadlines = action.payload.deletedHeadlines;
        state.displayedHeadlines = [
          ...action.payload.pinnedHeadlines,
          ...action.payload.headlines.filter(
            (h: Headline) =>
              !action.payload.pinnedHeadlines.some(
                (ph: Headline) => ph.title === h.title,
              ) &&
              !action.payload.deletedHeadlines.some(
                (dh: Headline) => dh.title === h.title,
              ),
          ),
        ].slice(0, 10);
      })
      .addCase(getStoredHeadlinesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      });
  },
});

export const {addNewHeadlines, pinHeadline, deleteHeadline} =
  headlinesSlice.actions;

export default headlinesSlice.reducer;
