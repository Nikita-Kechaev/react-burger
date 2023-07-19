import {
    TypedUseSelectorHook,
    useDispatch as dispatchHook,
    useSelector as selectorHook
} from 'react-redux';
import { TApplicationActions } from '../utils/interfaces';
import { ThunkDispatch } from "redux-thunk";
import { RootState } from './types-index';
  

export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;
export const useDispatch = dispatchHook<ThunkDispatch<RootState, never, TApplicationActions>>;