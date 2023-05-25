import {
    GET_ORDER_REQUEST,
    GET_ORDER_SUCCESS,
    GET_ORDER_FAILED,
    CLOSE_ORDER_MODAL
} from '../actions/order'

const initialState = {
    isVisible: false,
    orderNumber: '',
    orderRequest: false,
    orderFailed: false,
}

export const orderReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_ORDER_REQUEST: {
            return {
                ...state,
                orderRequest: true
            };
        }
        case GET_ORDER_SUCCESS: {
            return { 
                ...state,
                isVisible: true,
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
                orderNuber: ''
            }
        }
        default: {
            return {
                ...state
            }
        }
    }
}