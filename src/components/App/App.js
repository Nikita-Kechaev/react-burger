import React from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import useGetIngridients  from '../../utils/burger-api'
import { IngredientContext } from '../../utils/ingredientsContext';


export default function App () {

  const state = useGetIngridients()

  return (
    <>
      <AppHeader />
      {state.isloading && !state.hasError ? (
      <main className={styles.main}>
        <IngredientContext.Provider value={state.ingridients}>
          <BurgerIngridients />
          <BurgerConstructor />
        </IngredientContext.Provider>
      </main>
      ):(
      <main className={styles.main}>
        <p className="text text_type_main-medium">Подождите. Идёт загрузка данных</p>
      </main>
      )}
    </>
  );
}