import { ThunkAction } from 'redux-thunk';
import { ActionCreator } from 'redux';
import { store } from '../utils/store';
import { TApplicationActions } from '../utils/interfaces';

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<ReturnType = void> = ActionCreator<
    ThunkAction<ReturnType, RootState, never, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;