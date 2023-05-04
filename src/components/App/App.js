import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';

export default function App () {

  const [state, setState] = React.useState({ 
    ingridients: [],
    isloading: true
  })

  const ingredientsApiUrl = 'https://norma.nomoreparties.space/api/ingredients'

  React.useEffect(() => {
    const getIngridients = async () => {
      setState({...state, loading: true});
      const res = await fetch(ingredientsApiUrl);
      const data = await res.json();
      setState({ ingridients: data.data, isloading: false });
    }

    getIngridients();
  }, [])


  return (
    <>
      <AppHeader />
      { !state.isloading ? (
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