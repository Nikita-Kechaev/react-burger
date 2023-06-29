import { combineReducers } from 'redux';
import { ingReducer } from "./ingredients";
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { userReducer } from './user'

export const rootReducer = combineReducers({
    ingredients: ingReducer,
    order: orderReducer,
    constructorArr: constructorReducer,
    user: userReducer,
  });