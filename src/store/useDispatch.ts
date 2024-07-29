import {AppDispatch} from './store'; // Adjust the path according to your store setup
import {useDispatch as useReduxDispatch} from 'react-redux';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
