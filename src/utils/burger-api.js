import React from 'react';

export default function useGetFilms () {
    const [state, setState] = React.useState({ 
        ingridients: [],
        isloading: false,
        hasError: false,
    })

    const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients'

    const checkReponse = (res) => {
        return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
    };

    const getIngridients = async () => {
        setState({...state, isloading: false});
        const res = await fetch(ingredientsApiUrl).catch(e => setState({ ...state, hasError: true, isLoading: false }));
        const data = await checkReponse(res);
        setState({ ingridients: data.data, isloading: true });
    }

    React.useEffect(() => {
        getIngridients();
      }, [])

    return state 
}