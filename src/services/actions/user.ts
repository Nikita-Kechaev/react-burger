export const GET_USER_LOGIN_REQUEST = 'GET_USER_LOGIN_REQUEST';
export const GET_USER_LOGIN_SUCCESS = 'GET_USER_LOGIN_SUCCESS';
export const GET_USER_LOGIN_FAILED = 'GET_USER_LOGIN_FAILED';

export const GET_USER_AUTH_SUCCESS = 'GET_USER_AUTH_SUCCESS';

export const GET_LOGOUT = 'GET_LOGOUT';
export const GET_LOGOUT_FAILED = 'GET_LOGOUT_FAILED';

export const GET_USER_REFRESH_DATA_SUCCESS = 'GET_USER_REFRESH_DATA_SUCCESS';
export const GET_USER_REFRESH_DATA_FAILED = 'GET_USER_REFRESH_DATA_FAILED';

export const SEND_FORGOT_PASS_MESS_SUCCES = 'SEND_FORGOT_PASS_MESS_SUCCES';
export const SEND_FORGOT_PASS_MESS_FAILED = 'SEND_FORGOT_PASS_MESS_FAILED';

export const SEND_RESET_PASS_MESS_SUCCES = 'SEND_RESET_PASS_MESS_SUCCES';
export const SEND_RESET_PASS_MESS_FAILED = 'SEND_RESET_PASS_MESS_FAILED';

import { setCookie, deleteCookie } from '../../utils/cookie'

import { 
    getUserRequest,
    loginRequest, 
    refreshToken, 
    logOutRequest, 
    refreshUserData, 
    registerUser,
    forgotPassword,
    resetUserPassword
} from '../../utils/burger-api'

const useAuth = async (func:any, dispatch:any) => {
     await func.then((res:any) => {
        if (res.success) {
            let accessToken;
            let refreshToken;
            accessToken = res.accessToken.split('Bearer ')[1]
            refreshToken = res.refreshToken
            if (accessToken && refreshToken) {
                setCookie('accessToken', accessToken, { path: '/' });
                setCookie('refreshToken', refreshToken, { path: '/'});
            }
            dispatch ({
                type: GET_USER_LOGIN_SUCCESS,
                data: res
            })
        } else {
            dispatch({
                type: GET_USER_LOGIN_FAILED,
                data: res
            })
        }
    })
}

export const regUser = (form:any) => {
    return function (dispatch:any) {
        useAuth(registerUser(form), dispatch)
    }
}

export const signIn = (form:any)  => {
    return  function (dispatch:any) {
        useAuth(loginRequest(form), dispatch)
    }
};

export const forgPass = (email:any) => {
    return async function (dispatch:any) {
        await forgotPassword(email).then((res) => {
            if (res.success && email) {
                dispatch({
                    type: SEND_FORGOT_PASS_MESS_SUCCES,
                    data: email
                })
            } else {
                dispatch({
                    type: SEND_FORGOT_PASS_MESS_FAILED
                })
            }
        })
    }
}

export const getUser = () => async (dispatch:any) => {
    await getUserRequest().then((res) => {
        if (res.success) {
            dispatch({
                type: GET_USER_AUTH_SUCCESS,
                data: res
            });
        } else {
            if (res.message === 'jwt expired') {
                useAuth(refreshToken(), dispatch)
            } else {
                dispatch({
                    type: GET_USER_LOGIN_FAILED,
                    data: res
                })
            }
        }
    })
};


export const resetPassword = (form:any) => {
    return async function(dispatch:any) {
        await resetUserPassword(form).then((res) => {
            if (res.success) {
                dispatch({
                    type: SEND_RESET_PASS_MESS_SUCCES
                })
            } else {
                dispatch({
                    type: SEND_RESET_PASS_MESS_FAILED
                })
            }
        }).catch(err => console.error(err))
    }
}

export const signOut = () => {
    return async function(dispatch:any) {
        await logOutRequest().then((res) => {
            if (res.success) {
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
                dispatch({
                    type: GET_LOGOUT,
                    data: res
                })
            } else {
                dispatch({
                    type: GET_LOGOUT_FAILED,
                    data: res
                })
            }
        })
    }
}

export const refreshData = (form:any) => {
    return async function(dispatch:any) {
        await refreshUserData(form).then((res) => {
            if (res.success){
                dispatch({
                    type: GET_USER_REFRESH_DATA_SUCCESS,
                    data: res
                })
            } else {
                dispatch({
                    type: GET_USER_REFRESH_DATA_FAILED,
                    data: res 
                })
            }
        })
    }
    
}