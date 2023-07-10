import {  getOrderRequest } from '../../utils/burger-api'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const CLOSE_ORDER_MODAL = 'CLOSE_ORDER_MODAL'


export const getOrder = (ids:string[]) => {
  return function(dispatch:any) {
    dispatch({
      type: GET_ORDER_REQUEST
    });
    getOrderRequest(ids).then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ORDER_SUCCESS,
          order: res.result.order.number
        });
      } else {
        dispatch({
          type: GET_ORDER_FAILED
        });
      }
    }).catch((err) => console.log(err));
  };
}