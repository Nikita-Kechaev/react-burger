import {  getOrderRequest } from '../../utils/burger-api'
import { AppThunk } from '../../utils/types-index';

import {
GET_ORDER_REQUEST, 
GET_ORDER_SUCCESS, 
GET_ORDER_FAILED, 
} from '../constant'

import {
IGetOrderRequest,
IGetOrderSuccess,
IOrderFailed } from '../../utils/interfaces'


export const postOrderRequestAction = (): IGetOrderRequest => ({ type: GET_ORDER_REQUEST });
export const postOrderFailedAction = (): IOrderFailed => ({ type: GET_ORDER_FAILED });
export const postOrderSuccessAction = (number: string): IGetOrderSuccess => ({ type: GET_ORDER_SUCCESS, order:number });


export const getOrder: AppThunk = (ids:string[]) => {
  return function(dispatch:any) {
    dispatch(postOrderRequestAction());
    getOrderRequest(ids).then(res => {
      if (res && res.success) {
        dispatch(postOrderSuccessAction(res.result.order.number));
      } else {
        dispatch(postOrderFailedAction());
      }
    }).catch((err) => console.log(err));
  };
}