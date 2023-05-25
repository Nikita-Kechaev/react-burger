import React, { useEffect } from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import { useDispatch, useSelector } from 'react-redux';
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor';
import { getIngridients } from '../../services/actions/ingredients';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";



export default function App () {

  const dispatch = useDispatch();
  const { isLoading, hasError } = useSelector(store => store.ingredients)

  useEffect(
    () => {
      dispatch(getIngridients());
    },
    []
  );

  return (
    <>
      <AppHeader />
      { !isLoading && !hasError? (
      <main className={styles.main}>
          <DndProvider backend={HTML5Backend}>
            <BurgerIngridients />
            <BurgerConstructor />
          </DndProvider>
      </main>
      ):(
      <main className={styles.main}>
        <p className="text text_type_main-medium">Подождите. Идёт загрузка данных</p>
      </main>
      )}
    </>
  );
}