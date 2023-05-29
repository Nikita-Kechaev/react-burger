import { combineReducers } from 'redux';
import { ingReducer } from "./ingredients";
import { orderReducer } from './order';
import { constructorReducer } from './constructor';

export const rootReducer = combineReducers({
    ingredients: ingReducer,
    order: orderReducer,
    constructorArr: constructorReducer
  });