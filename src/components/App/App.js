import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import useGetFilms  from '../../utils/burger-api'

export default function App () {

  const state = useGetFilms()

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