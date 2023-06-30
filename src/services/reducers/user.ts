import {
    GET_USER_REQUEST_START,
    GET_USER_REQUEST_END,
    GET_USER_AUTH_SUCCESS,
    GET_USER_LOGIN_SUCCESS,
    GET_LOGOUT,
    GET_LOGOUT_FAILED,
    GET_USER_REFRESH_DATA_SUCCESS,
    GET_USER_REFRESH_DATA_FAILED,
    SEND_FORGOT_PASS_MESS_SUCCES,
    SEND_FORGOT_PASS_MESS_FAILED,
    SEND_RESET_PASS_MESS_SUCCES,
    SEND_RESET_PASS_MESS_FAILED,
} from '../actions/user'

const initialState = {
    user: '',
    errorMessage: '',
    sendEmail: false,
    email: '',
    isLoading: '',
}

export const userReducer = (state = initialState, action:any) => {
    switch (action.type) {
        case GET_USER_REQUEST_START: {
            return {
                ...state,
                isLoading: true,
            }
        }
        case GET_USER_REQUEST_END: {
            return {
                ...state,
                isLoading: false,
            }
        }
        case GET_USER_AUTH_SUCCESS: {
            return {
                ...state,
                user: action.data.user,
            }
        }
        case GET_USER_LOGIN_SUCCESS: {
            return {
              ...state,
              user: action.data.user,
              errorMessage: ''
            };
        }
        case GET_LOGOUT: {
            return {
                ...state,
                user: '',
                errorMessage: action.data.message
            }
        }
        case GET_LOGOUT_FAILED: {
            return {
                ...state,
                user: '',
                errorMessage: action.data.message
            }
        }
        case GET_USER_REFRESH_DATA_SUCCESS: {
            return {
                ...state,
                user: action.data.user
            }
        }
        case GET_USER_REFRESH_DATA_FAILED: {
            return {
                ...state,
                errorMessage: action.data.message
            }
        }
        case SEND_FORGOT_PASS_MESS_SUCCES: {
            return{
                ...state,
                email: action.data.email,
                sendEmail: true
            }
        }
        case SEND_FORGOT_PASS_MESS_FAILED: {
            return{
                ...state,
                sendEmail: false,
            }
        }
        case SEND_RESET_PASS_MESS_SUCCES: {
            return{
                ...state,
                sendEmail: false,
                email: ''
            }
        }
        case SEND_RESET_PASS_MESS_FAILED: {
            return{
                ...state,
            }
        } 
        default: {
            return state;
        }
    }
}