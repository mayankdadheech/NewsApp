import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiCaller from '../../api/client';
import Config from 'react-native-config';

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

export const fetchHeadlinesAction = createAsyncThunk(
  'headlines/fetchHeadlines',
  async (
    params: {apiKey: string; q: string; language: string},
    {dispatch, rejectWithValue},
  ) => {
    try {
      const response = await apiCaller({
        url: `${Config.NEWS_URL}`,
        method: 'GET',
        params: {...params, pageSize: 100},
      });

      const headlines: Headline[] = response.articles.slice(0, 100);
      await AsyncStorage.setItem('headlines', JSON.stringify(headlines));
      return headlines;
    } catch (error: unknown) {
      // Type assertion approach
      if (error instanceof Error) {
        console.error('Error fetching headlines:', error.message);
        return rejectWithValue(error.message);
      }
      // Fallback error handling if the error is not an instance of Error
      console.error('Unknown error fetching headlines:', error);
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
        console.error('Error getting stored headlines:', error.message);
        return rejectWithValue(error.message);
      }
      console.error('Unknown error getting stored headlines:', error);
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
      .addCase(fetchHeadlinesAction.pending, state => {
        state.loading = true;
      })
      .addCase(fetchHeadlinesAction.fulfilled, (state, action) => {
        state.loading = false;
        state.headlines = action.payload;
        state.displayedHeadlines = action.payload.slice(0, 10);
      })
      .addCase(fetchHeadlinesAction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'An error occurred';
      })
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
