import {configureStore} from '@reduxjs/toolkit';
import headlinesReducer from './slices/headlinesSlice';

const store = configureStore({
  reducer: {
    headlines: headlinesReducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export default store;
