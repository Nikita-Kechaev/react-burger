import {
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE
  } from '../constant';
  import { TWsAuthActions } from '../../utils/interfaces';
  import { TOrders } from '../../utils/types';
  
export  type TWsAuthInitialState = {
    wsConnected: boolean;
    orders: ReadonlyArray<TOrders>
    total: number;
    totalToday: number;
    error: string | undefined,
  };
    
export  const initialState: TWsAuthInitialState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0,
    error: undefined,
  };
  
  export const wsAuthReducer = (state = initialState, action: TWsAuthActions): TWsAuthInitialState => {
    switch (action.type) {
      case WS_AUTH_CONNECTION_SUCCESS:
        return {
            ...state,
            error: undefined,
            wsConnected: true,
        };
      case WS_AUTH_CONNECTION_ERROR:
        return {
            ...state,
            error: action.payload,
            wsConnected: false,
        };
      case WS_AUTH_CONNECTION_CLOSED:
        return {
            ...state,
            error: undefined,
            wsConnected: false,
        };
      case WS_AUTH_GET_MESSAGE:
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