const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients'

const checkReponse = (res) => {
    return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

export const getIngridients = async () => {
    setState({...state, isloading: false});
    const res = await fetch(ingredientsApiUrl).catch(e => setState({ ...state, hasError: true, isLoading: false }));
    const data = await checkReponse(res);
    setState({ ingridients: data.data, isloading: true });
}