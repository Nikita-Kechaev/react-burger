import { WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_SEND_MESSAGE } from "../constant";
  import { TOrders } from "../../utils/types";
  import { IWsAuthConnectionStartAction,
    IWsAuthConnectionSuccessAction,
    IWsAuthConnectionErrorAction,
    IWsAuthConnectionClosedAction,
    IWsAuthGetMessageAction,
    IWsAuthSendMessageAction
  } from '../../utils/interfaces';
  
  export const wsAuthConnectionStartAction = (url: string): IWsAuthConnectionStartAction => ({ type: WS_AUTH_CONNECTION_START, payload: url });
  export const wsAuthConnectionSuccessAction = (error: string | undefined): IWsAuthConnectionSuccessAction => ({ type: WS_AUTH_CONNECTION_SUCCESS, payload: error })
  export const wsAuthConnectionErrorAction = (error: string | undefined): IWsAuthConnectionErrorAction => ({ type: WS_AUTH_CONNECTION_ERROR, payload: error })
  export const wsAuthConnectionClosedAction = (): IWsAuthConnectionClosedAction => ({ type: WS_AUTH_CONNECTION_CLOSED });
  export const wsAuthGetMessageAction = (data: { readonly error: string | undefined; readonly orders: ReadonlyArray<TOrders>; readonly total: number; readonly totalToday: number; }): IWsAuthGetMessageAction => ({ type: WS_AUTH_GET_MESSAGE, payload: data});
  export const wsAuthSendMessageAction = (): IWsAuthSendMessageAction => ({ type: WS_AUTH_SEND_MESSAGE });
  
  export const wsAuthActions = {
    wsStart: WS_AUTH_CONNECTION_START,
    onOpen: WS_AUTH_CONNECTION_SUCCESS,
    onError: WS_AUTH_CONNECTION_ERROR,
    onClose: WS_AUTH_CONNECTION_CLOSED,
    onMessage: WS_AUTH_GET_MESSAGE,
    wsSend: WS_AUTH_SEND_MESSAGE
  }