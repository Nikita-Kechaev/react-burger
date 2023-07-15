import { combineReducers } from 'redux';
import { ingReducer } from "./ingredients";
import { orderReducer } from './order';
import { constructorReducer } from './constructor';
import { userReducer } from './user'
import { wsReducer } from './webSocket';
import { wsAuthReducer } from './webSocketAuth'

export const rootReducer = combineReducers({
    ingredients: ingReducer,
    order: orderReducer,
    constructorArr: constructorReducer,
    user: userReducer,
    ws: wsReducer,
    wsAuth: wsAuthReducer,
  });