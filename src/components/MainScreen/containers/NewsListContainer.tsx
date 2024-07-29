import React, {useEffect, useCallback, useRef} from 'react';
import {useSelector} from 'react-redux';

import Config from 'react-native-config';

import {
  addNewHeadlines,
  fetchInitialHeadlinesAction,
  getStoredHeadlinesAction,
} from '../../../store/slices/headlinesSlice';
import {useDispatch} from '../../../store/useDispatch';
import {RootState} from '../../../store/types';
import NewsList from '../presentationalComponents/NewsList';
import logger from '../../../utils/logger';

const NewsListContainer: React.FC = () => {
  const dispatch = useDispatch();
  const headlines = useSelector(
    (state: RootState) => state.headlines.headlines,
  );
  const displayedHeadlines = useSelector(
    (state: RootState) => state.headlines.displayedHeadlines,
  );

  const pinnedHeadlines = useSelector(
    (state: RootState) => state.headlines.pinnedHeadlines,
  );

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const addNewHeadlines_ = useCallback(() => {
    dispatch(addNewHeadlines());
  }, [dispatch]);

  const resetDripTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(addNewHeadlines_, 10000);
  }, [addNewHeadlines_]);

  const loadHeadlines = useCallback(async () => {
    try {
      await dispatch(getStoredHeadlinesAction()).unwrap();

      if (headlines.length === 0) {
        const apiKey = Config.NEWS_API as string;
        if (!apiKey) {
          logger.error(
            'NEWS_API key is not defined in the environment variables.',
          );
          return;
        }

        const params = {
          apiKey,
          language: 'en',
          q: 'bitcoin', // Assumed that this can vary accordingly. As in top-headlines, I was not getting data of more than 100 size.
        };
        await dispatch(fetchInitialHeadlinesAction(params)).unwrap();
      }
    } catch (error) {
      logger.error('Error loading headlines:', error);
    }
  }, [dispatch, headlines.length]);

  useEffect(() => {
    loadHeadlines();
    resetDripTimer();
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [loadHeadlines, resetDripTimer]);

  const handleRefresh = useCallback(() => {
    addNewHeadlines_();
    resetDripTimer();
  }, [addNewHeadlines_, resetDripTimer]);

  const combinedHeadlines = [
    ...pinnedHeadlines,
    ...displayedHeadlines.filter(
      headline =>
        !pinnedHeadlines.some(pinned => pinned.title === headline.title),
    ),
  ];

  return (
    <NewsList
      pinnedHeadlines={pinnedHeadlines}
      displayedHeadlines={combinedHeadlines}
      onRefresh={handleRefresh}
    />
  );
};

export default NewsListContainer;
