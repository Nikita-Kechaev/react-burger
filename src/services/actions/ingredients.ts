import {  getItemsRequest } from '../../utils/burger-api'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_CURRENT_ITEM = 'GET_CURRENT_ITEM';
export const CLOSE_CURRENT_ITEM = 'CLOSE_CURRENT_ITEM'

export const getIngridients = () => {
  return function(dispatch:any) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    getItemsRequest().then(res => {
      if (res && res.success) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.result
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    });
  };
}