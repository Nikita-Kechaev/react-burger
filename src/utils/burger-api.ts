import { getCookie } from './cookie';
import { Ingredient } from './types'

const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkReponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

export const getItemsRequest = async (): Promise<Ingredient[]> => {
    const response = await fetch(BASE_URL + '/ingredients')
    const result = await checkReponse(response)
    return result.data
};

export const getOrderRequest = async (ids:string[]) => {
    const response = await fetch(BASE_URL + '/orders', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify({
            "ingredients": ids
        })
    });
    const result = await checkReponse(response);
    return ({
        result: result,
        success: true
    })
}

export const getUserRequest = async () => {
        const response = await fetch(BASE_URL + '/auth/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
            },
        })
        const result = checkReponse(response)
        return result
}

export const refreshToken = async () => {
    const response = await fetch(BASE_URL + '/auth/token', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": getCookie('refreshToken')
        })
    })
    const result = await checkReponse(response)
    return result
}

export const loginRequest = async (form: {email: string, password: string }) => {
    const response = await fetch(BASE_URL + '/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(form)
    })
    const result = await checkReponse(response)
    return result
};

export const logOutRequest = async () => {
    const response = await fetch(BASE_URL + '/auth/logout', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "token": getCookie('refreshToken')
        })
    })
    const result = await checkReponse(response)
    return result
}

export const refreshUserData = async (form: {name: string, email: string, password: string}) => {
    const response = await fetch(BASE_URL + '/auth/user', {
        method: 'PATCH',
        headers : {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
        },
        body: JSON.stringify(form)
    })
    const result = checkReponse(response)
    return result
}

export const registerUser = async (form: {name: string, email: string, password: string}) => {
    const response = await fetch(
        BASE_URL + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }
    )
    const result = checkReponse(response)
    return result
}

export const forgotPassword = async (email:string) => {
    const response = await fetch(
        BASE_URL + '/password-reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(email)
        }
    )
    const result = checkReponse(response)
    return result
}

export const resetUserPassword = async (form: {password: string, token: string, email: string}) => {
    const response = await fetch(
        BASE_URL + '/password-reset/reset', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(form)
        }
    )
    const result = checkReponse(response)
    return result
}