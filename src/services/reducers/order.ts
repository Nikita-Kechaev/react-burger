import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from '../constant'
import { TOrderActions } from "../../utils/interfaces"

export type TOrdersInitialState = {
    readonly isVisible: boolean,
    readonly orderNumber: string,
    readonly orderRequest: boolean,
    readonly orderFailed: boolean,
}

const initialState = {
    isVisible: false,
    orderNumber: '',
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = initialState, action:TOrderActions): TOrdersInitialState  => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                isVisible: true,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return { 
                ...state,
                orderFailed: false, 
                orderNumber: action.order, 
                orderRequest: false 
            };
        }
        case GET_ORDER_FAILED: {
            return {
                ...state,
                orderFailed: true,
                orderRequest: false
            };
        }
        case CLOSE_ORDER_MODAL: {
            return {
                ...state,
                isVisible: false,
                orderNumber: ''
            }
        }
        default: {
            return state;
        }
    }
}