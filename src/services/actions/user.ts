import {GET_USER_REQUEST_START,
GET_USER_REQUEST_END,
GET_USER_LOGIN_SUCCESS,
GET_USER_LOGIN_FAILED,
GET_USER_AUTH_SUCCESS,
GET_LOGOUT,
GET_LOGOUT_FAILED,
GET_USER_REFRESH_DATA_SUCCESS,
GET_USER_REFRESH_DATA_FAILED,
SEND_FORGOT_PASS_MESS_SUCCES,
SEND_FORGOT_PASS_MESS_FAILED,
SEND_RESET_PASS_MESS_SUCCES ,
SEND_RESET_PASS_MESS_FAILED,
} from '../constant'

import { AppThunk, AppDispatch } from '../../utils/types-index';
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

import {
    IGetUserRequestStart,
    IGetUserRequestEnd,
    IGetUserloginSuccess,
    IGetUserloginFailed,
    IGetUserAuthSuccess,
    IGetUserLogout,
    IGetUserLogoutFailed,
    IGetUserRefreshDataSuccess,
    IGetUserRefreshDataFailed,
    ISendForgetPssMessSuccess,
    ISendForgetPssMessFailed,
    ISendResetPssMessSuccess,
    ISendResetPssMessFailed
} from '../../utils/interfaces'

import { TRegForm } from '../../utils/types';
import { TTokens } from '../../utils/types';

export type TUser = {
    readonly user: {
        readonly email: string;
        readonly name: string;
    }
}

export const getUserLoginSuccessAction = (res:TUser): IGetUserloginSuccess => ({ type: GET_USER_LOGIN_SUCCESS, data: res });
export const getUserLoginFailedAction = (): IGetUserloginFailed => ({ type: GET_USER_LOGIN_FAILED });
export const sendForgotPassMessSuccessAction = (email: string): ISendForgetPssMessSuccess  => ({ type: SEND_FORGOT_PASS_MESS_SUCCES, data: {email}});
export const sendForgotPassMessFailedAction = (): ISendForgetPssMessFailed => ({ type: SEND_FORGOT_PASS_MESS_FAILED });
export const getUserRequestStartAction = (): IGetUserRequestStart => ({ type: GET_USER_REQUEST_START })
export const getUserAuthSuccessAction = (res: TUser): IGetUserAuthSuccess => ({type: GET_USER_AUTH_SUCCESS, data: res})
export const getUserAuthFailedAction = ():  IGetUserloginFailed => ({type: GET_USER_LOGIN_FAILED })
export const getUserRequestEndAction = (): IGetUserRequestEnd => ({ type: GET_USER_REQUEST_END })
export const postResetPassMessSuccessAction = (): ISendResetPssMessSuccess => ({type: SEND_RESET_PASS_MESS_SUCCES})
export const postResetPassMessFailedAction = (): ISendResetPssMessFailed => ({ type:  SEND_RESET_PASS_MESS_FAILED})
export const getLogoutAction = (message: string):  IGetUserLogout => ({ type: GET_LOGOUT, data: {message} })
export const getLogoutFailedAction = (message: string):  IGetUserLogoutFailed => ({ type: GET_LOGOUT_FAILED, data: {message} })
export const getUserRefreshDataSuccessACtion = (res:TUser): IGetUserRefreshDataSuccess => ({ type: GET_USER_REFRESH_DATA_SUCCESS, data: res})
export const getUserRefreshDataFailedACtion = (message: string): IGetUserRefreshDataFailed => ({ type: GET_USER_REFRESH_DATA_FAILED, data: {message}})

const userAuth = async (func: Promise<TTokens>, dispatch:AppDispatch) => {
     await func.then((res:TTokens) => {
            let accessToken;
            let refreshToken;
            accessToken = res.accessToken.split('Bearer ')[1]
            refreshToken = res.refreshToken
            if (accessToken && refreshToken) {
                setCookie('accessToken', accessToken, { path: '/' });
                setCookie('refreshToken', refreshToken, { path: '/'});
            }
            dispatch (getUserLoginSuccessAction(res))
        }
    ).catch(() => dispatch(getUserLoginFailedAction())
    )
}

export const regUser: AppThunk = (form:TRegForm) => {
    return function (dispatch:AppDispatch) {
        userAuth(registerUser(form), dispatch)
    }
}

export const signIn: AppThunk = (form: {email: string, password: string })  => {
    return  function (dispatch:AppDispatch) {
        userAuth(loginRequest(form), dispatch)
    }
};

export const forgPass: AppThunk = (email:string) => {
    return async function (dispatch:AppDispatch) {
        await forgotPassword(email).then(() => {
            dispatch(sendForgotPassMessSuccessAction(email))
        }).catch(() =>
            dispatch(sendForgotPassMessFailedAction())
        )
    }
}

export const getUser: AppThunk = () => (dispatch:AppDispatch) => {
    dispatch(getUserRequestStartAction());
    getUserRequest().then((res) => {
        if (res.success) {
            dispatch(getUserAuthSuccessAction(res));
        } else {
            if (res.message === 'jwt expired') {
                userAuth(refreshToken(), dispatch)
            } else {
                dispatch(getUserAuthFailedAction())
            }
        }
    }).catch((err) => console.log(err.message));
    dispatch(getUserRequestEndAction());
};

export const resetPassword: AppThunk = (form: {email: string, password: string, token: string}) => {
    return async function(dispatch:AppDispatch) {
        await resetUserPassword(form).then(() => {
        dispatch(postResetPassMessSuccessAction())   
        }).catch(() => dispatch(postResetPassMessFailedAction()))
    }
}

export const signOut: AppThunk = () => {
    return async function(dispatch:AppDispatch) {
        await logOutRequest().then((res) => {
                deleteCookie('accessToken')
                deleteCookie('refreshToken')
                dispatch(getLogoutAction(res))
     
        }).catch((res) => dispatch(getLogoutFailedAction(res)))
    }
}

export const refreshData: AppThunk = (form:{name: string, email: string, password: string}) => {
    return async function(dispatch:AppDispatch) {
        await refreshUserData(form).then((res) => {
                dispatch(getUserRefreshDataSuccessACtion(res))
        }).catch((res) => dispatch(getUserRefreshDataFailedACtion(res)))
    }
}