import React from 'react';

const BASE_URL = 'https://norma.nomoreparties.space/api'
const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export default function useGetIngridients () {
    const [state, setState] = React.useState({ 
        ingridients: '',
        isloading: false,
        hasError: false,
    })

    const ingredientsApiUrl = BASE_URL + '/ingredients'

    const getIngridients = async () => {
        setState({...state, isloading: false});
        const res = await fetch(ingredientsApiUrl).catch(e => setState({ ...state, hasError: true, isLoading: false }));
        const data = await checkReponse(res).catch(e => setState({ ...state, hasError: true, isLoading: false }));
        setState({ ingridients: data.data, isloading: true });
    }

    React.useEffect(() => {
        getIngridients();
      }, [])

    return state 
}

export const useGetOrder = (ids) => {

    const [state, setState] = React.useState({ 
        orderNumber: [],
        isloading: false,
        hasError: false,
    })

    const orderApiUrl = BASE_URL + '/orders'
    const getOrderNumber = async () => {
        setState({...state, isloading: false});
        const res = await fetch(orderApiUrl, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "ingredients": ids
            })
        }).catch(e => setState({ ...state, hasError: true, isLoading: false }));
        const data = await checkReponse(res).catch(e => setState({ ...state, hasError: true, isLoading: false }));
        setState({ orderNumber: data, isloading: true });
    }

    React.useEffect(() => {
        getOrderNumber();
      }, [])

    return state
}