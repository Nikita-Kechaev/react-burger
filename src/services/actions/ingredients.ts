import {  getItemsRequest } from '../../utils/burger-api'

import {
GET_ITEMS_REQUEST,
GET_ITEMS_SUCCESS,
GET_ITEMS_FAILED,
GET_CURRENT_ITEM,
CLOSE_CURRENT_ITEM
} from '../constant'

import {
  IGetItemsRequest,
  IGetItemsSuccess,
  IGetItemsFailed,
  ICloseCurrentItem,
  IGetCurrentItem
} from '../../utils/interfaces'

import { Ingredient } from "../../utils/types"
import { AppThunk, AppDispatch } from '../../utils/types-index';

export const getIngredientsRequestAction = (): IGetItemsRequest => ({ type: GET_ITEMS_REQUEST });
export const getIngredientsFailedAction = (): IGetItemsFailed => ({ type: GET_ITEMS_FAILED });
export const getIngredientsSuccessAction = (data: Array<Ingredient>): IGetItemsSuccess => ({ type: GET_ITEMS_SUCCESS, items: data});
export const closeCurrentItemACtion = (): ICloseCurrentItem => ({type: CLOSE_CURRENT_ITEM})
export const getCurrentItemACtion = (item: Ingredient): IGetCurrentItem => ({type: GET_CURRENT_ITEM, item: item})

export const getIngridients: AppThunk = () => {
  return async function(dispatch:AppDispatch) {
    dispatch(getIngredientsRequestAction());
    await getItemsRequest().then(res => {
      if (res) {
        dispatch(getIngredientsSuccessAction(res));
      } else {
        dispatch(getIngredientsFailedAction());
      }
    }).catch((err) => console.log(err));
  };
}