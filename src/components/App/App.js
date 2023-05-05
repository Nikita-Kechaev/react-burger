import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngridients } from '../../utils/burger-api'

export default function App () {

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


  return (
    <>
      <AppHeader />
      {state.isloading && !state.hasError ? (
      <main className={styles.main}>
        <BurgerIngridients ingridients={state.ingridients} />
        <BurgerConstructor ingridients={state.ingridients} />
      </main>
      ):(
      <main className={styles.main}>
        <p className="text text_type_main-medium">Подождите. Идёт загрузка данных</p>
      </main>
      )}
    </>
  );
}