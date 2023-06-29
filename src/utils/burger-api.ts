import { getCookie } from './cookie';

const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkReponse = (res:Response) => {
    return res.ok ? res.json() : res.json().then((err:any) => Promise.reject(err));
};

export const getItemsRequest = async () => {
    try {
        const response = await fetch(BASE_URL + '/ingredients')
        const result = await checkReponse(response)
        return ({
            result: result.data,
            success: true
        })
    } catch (err:any) {
        throw new Error(err)
    }
};

export const getOrderRequest = async (ids:string[]) => {
    try {
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
    } catch (err:any) {
        throw new Error(err)
    }
}

export const getUserRequest = async () => {
    try {
        const response = await fetch(BASE_URL + '/auth/user', {
            method: 'GET',
            headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + getCookie('accessToken')
            },
        })
        const result = await checkReponse(response)
        return result
    } catch (err:any) {
        return err
    }
}

export const refreshToken = async () => {
    try {
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
    } catch (err:any) {
        return err
    }
}

export const loginRequest = async (form: {email: string, password: string }) => {
    try {
        const response = await fetch(BASE_URL + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        })
        const result = await checkReponse(response)
        return result
    } catch (err:any) {
        return err
    }
};

export const logOutRequest = async () => {
    try {
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
    } catch (err:any) {
        return err
    }
}

export const refreshUserData = async (form: {name: string, email: string, password: string}) => {
    try {
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
    } catch (err:any){
        return err
    }
}

export const registerUser = async (form: {name: string, email: string, password: string}) => {
    try {
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
    } catch (err:any) {
        return err
    }
}

export const forgotPassword = async (email:string) => {
    try {
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
    } catch (err:any){
        throw new Error(err)
    }
}

export const resetUserPassword = async (form: {password: string, token: string, email: string}) => {
    try {
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
    } catch (err:any) {
        throw new Error(err)
    }
}