import {AppDispatch} from '@store/storeConfig'; // Adjust the path according to your store setup
import {useDispatch as useReduxDispatch} from 'react-redux';

export const useDispatch = () => useReduxDispatch<AppDispatch>();
