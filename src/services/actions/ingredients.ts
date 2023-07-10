import {  getItemsRequest } from '../../utils/burger-api'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const GET_CURRENT_ITEM = 'GET_CURRENT_ITEM';
export const CLOSE_CURRENT_ITEM = 'CLOSE_CURRENT_ITEM'

export const getIngridients = () => {
  return async function(dispatch:any) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    await getItemsRequest().then(res => {
      if (res) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res
        });
      } else {
        dispatch({
          type: GET_ITEMS_FAILED,
        });
      }
    }).catch((err) => console.log(err));
  };
}