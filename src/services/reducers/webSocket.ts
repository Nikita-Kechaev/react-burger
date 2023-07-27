import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
} from '../constant';
import { TWsActions } from '../../utils/interfaces';
import { TOrders } from '../../utils/types';
  
export type TWsInitialState = {
    wsConnected: boolean;
    orders: ReadonlyArray<TOrders>
    total: number;
    totalToday: number;
    error: string | undefined,
  };
  
export const initialState: TWsInitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined,
};

  export const wsReducer = (state = initialState, action: TWsActions): TWsInitialState => {
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
            ...state,
            error: undefined,
            wsConnected: true,
        };
      case WS_CONNECTION_ERROR:
        return {
            ...state,
            error: action.payload,
            wsConnected: false,
        };
      case WS_CONNECTION_CLOSED:
        return {
            ...state,
            error: undefined,
            wsConnected: false,
        };
      case WS_GET_MESSAGE:
        return {
            ...state,
            error: undefined,
            orders: action.payload.orders,
            total: action.payload.total,
            totalToday: action.payload.totalToday,
        };
      default:
        return state;
    }
  };