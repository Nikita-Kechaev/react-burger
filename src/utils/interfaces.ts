import { WS_CONNECTION_START,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_SEND_MESSAGE,
    WS_AUTH_CONNECTION_START,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_GET_MESSAGE,
    WS_AUTH_SEND_MESSAGE
} from "../services/constant";

import {
  MOVE_CARD,
  ADD_ITEMS_TO_CONSTRUCTOR,
  DELTE_ITEM_FROM_CONSTRUCTOR,
  CLEAR_CONSTRUCTOR
} from "../services/constant";

import { TOrders } from "../utils/types";
import { Ingredient } from "../utils/types";

// интерфейсы сокета
export interface IWsConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    readonly payload: string;
  }
export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS;
  readonly payload: string | undefined;
}
export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR;
  readonly payload: string | undefined;
}
export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: { 
    readonly error: string | undefined;
    readonly orders: ReadonlyArray<TOrders>;
    readonly total: number;
    readonly totalToday: number;
  }
}
export interface IWsSendMessageAction {
  readonly type: typeof WS_SEND_MESSAGE;
}

export type TWsActions = IWsConnectionStartAction
| IWsConnectionSuccessAction
| IWsConnectionErrorAction
| IWsConnectionClosedAction
| IWsGetMessageAction
| IWsSendMessageAction;

// интерфейсы авторизированного сокета
export interface IWsAuthConnectionStartAction {
  readonly type: typeof WS_AUTH_CONNECTION_START;
  readonly payload: string;
}
export interface IWsAuthConnectionSuccessAction {
  readonly type: typeof WS_AUTH_CONNECTION_SUCCESS;
  readonly payload: string | undefined;
}
export interface IWsAuthConnectionErrorAction {
  readonly type: typeof WS_AUTH_CONNECTION_ERROR;
  readonly payload: string | undefined;
}
export interface IWsAuthConnectionClosedAction {
  readonly type: typeof WS_AUTH_CONNECTION_CLOSED;
}
export interface IWsAuthGetMessageAction {
  readonly type: typeof WS_AUTH_GET_MESSAGE;
  readonly payload: { 
    readonly error: string | undefined;
    readonly orders: ReadonlyArray<TOrders>;
    readonly total: number;
    readonly totalToday: number;
  }
}
export interface IWsAuthSendMessageAction {
  readonly type: typeof WS_AUTH_SEND_MESSAGE;
}

export type TWsAuthActions = IWsAuthConnectionStartAction
| IWsAuthConnectionSuccessAction
| IWsAuthConnectionErrorAction
| IWsAuthConnectionClosedAction
| IWsAuthGetMessageAction
| IWsAuthSendMessageAction;

// интерфейсы конструктора
export interface IAddItemsToConstructor {
  readonly type: typeof ADD_ITEMS_TO_CONSTRUCTOR;
  readonly item: Ingredient ;
  readonly bun: any;
}
export interface IDeleteItemFromConstructor {
  readonly type: typeof DELTE_ITEM_FROM_CONSTRUCTOR;
  readonly item: Ingredient
}
export interface IMoveCard {
  readonly type: typeof MOVE_CARD;
  dragIndex: number;
  hoverIndex: number;

}
export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
  item?: Ingredient
}

export type TBurgerConstructorActions = IAddItemsToConstructor
  | IDeleteItemFromConstructor
  | IMoveCard
  | IClearConstructor

// интерфейсы ингредиентов
import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  GET_CURRENT_ITEM,
  CLOSE_CURRENT_ITEM
} from '../services/constant'

export interface IGetItemsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
}
export interface IGetItemsRequest {
  readonly type: typeof GET_ITEMS_REQUEST;
}
export interface IGetItemsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly items: string | Ingredient[]

}
export interface IGetCurrentItem {
  readonly type: typeof GET_CURRENT_ITEM;
  item: Ingredient
}
export interface ICloseCurrentItem {
  readonly type: typeof CLOSE_CURRENT_ITEM;
  item?: Ingredient
}

export type TBurgerIngredientActions = IGetItemsFailed
  | IGetItemsRequest
  | IGetItemsSuccess 
  | IGetCurrentItem
  | ICloseCurrentItem

// интерфейсы ордера 

import {
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
  GET_ORDER_FAILED,
  CLOSE_ORDER_MODAL
} from '../services/constant'

export interface IGetOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly order: string
}
export interface IOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
}
export interface ICloseOrderModal {
  readonly type: typeof CLOSE_ORDER_MODAL;
}

export type TOrderActions = IGetOrderRequest
  | IGetOrderSuccess
  | IOrderFailed 
  | ICloseOrderModal

// интерфейсы пользователя

import {GET_USER_REQUEST_START,
  GET_USER_REQUEST_END,
  GET_USER_LOGIN_REQUEST,
  GET_USER_LOGIN_SUCCESS,
  GET_USER_LOGIN_FAILED,
  GET_USER_AUTH_SUCCESS,
  GET_LOGOUT,
  GET_LOGOUT_FAILED,
  GET_USER_REFRESH_DATA_SUCCESS,
  GET_USER_REFRESH_DATA_FAILED,
  SEND_FORGOT_PASS_MESS_SUCCES,
  SEND_FORGOT_PASS_MESS_FAILED,
  SEND_RESET_PASS_MESS_SUCCES ,
  SEND_RESET_PASS_MESS_FAILED,
} from '../services/constant'

export interface IGetUserRequestStart {
  readonly type: typeof GET_USER_REQUEST_START;
}

export interface IGetUserRequestEnd {
  readonly type: typeof GET_USER_REQUEST_END;
}

export interface IGetUserloginRequest {
  readonly type: typeof GET_USER_LOGIN_REQUEST;
}

export interface IGetUserloginSuccess {
  readonly type: typeof GET_USER_LOGIN_SUCCESS;
  data: {
    readonly user: {
      readonly email: string;
      readonly name: string;
  },
  }
}

export interface IGetUserloginFailed {
  readonly type: typeof GET_USER_LOGIN_FAILED;
}

export interface IGetUserAuthSuccess {
  readonly type: typeof GET_USER_AUTH_SUCCESS;
  data:{
    readonly user: {
      readonly email: string;
      readonly name: string;
  },
  }
}

export interface IGetUserLogout {
  readonly type: typeof GET_LOGOUT;
  data: {
    message:string
  }
}

export interface IGetUserLogoutFailed {
  readonly type: typeof GET_LOGOUT_FAILED;
  data: {
    message: string
  }
}

export interface IGetUserRefreshDataSuccess {
  readonly type: typeof GET_USER_REFRESH_DATA_SUCCESS;
  data: {
    readonly user: {
      readonly email: string;
      readonly name: string;
  },
  }
}

export interface IGetUserRefreshDataFailed {
  readonly type: typeof GET_USER_REFRESH_DATA_FAILED;
  data: {
    message:string
  }
}

export interface ISendForgetPssMessSuccess {
  readonly type: typeof SEND_FORGOT_PASS_MESS_SUCCES;
  data: {
    email:string
  }
}

export interface ISendForgetPssMessFailed {
  readonly type: typeof SEND_FORGOT_PASS_MESS_FAILED;
}

export interface ISendResetPssMessSuccess {
  readonly type: typeof SEND_RESET_PASS_MESS_SUCCES;
}

export interface ISendResetPssMessFailed {
  readonly type: typeof SEND_RESET_PASS_MESS_FAILED;
}

export type TUserActions = IGetUserRequestStart
  | IGetUserRequestEnd
  | IGetUserloginRequest
  | IGetUserloginSuccess
  | IGetUserloginFailed
  | IGetUserAuthSuccess
  | IGetUserLogout
  | IGetUserLogoutFailed
  | IGetUserRefreshDataSuccess
  | IGetUserRefreshDataFailed
  | ISendForgetPssMessSuccess
  | ISendForgetPssMessFailed
  | ISendResetPssMessSuccess
  | ISendResetPssMessFailed

  export type TApplicationActions = TUserActions 
  | TBurgerConstructorActions 
  | TBurgerIngredientActions
  | TOrderActions
  | TWsAuthActions
  | TWsActions;