import React from 'react';

const BASE_URL = 'https://norma.nomoreparties.space/api'

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getItemsRequest = async () => {
    try {
        const response = await fetch(BASE_URL + '/ingredients')
        const result = await checkReponse(response)
        return ({
            result: result.data,
            success: true
        })
    } catch (err) {
        throw new Error(err)
    }
};

export const getOrderRequest = async (ids) => {
    try {
        const response = await fetch(BASE_URL + '/orders', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
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
    } catch (err) {
        throw new Error(err)
    }
}