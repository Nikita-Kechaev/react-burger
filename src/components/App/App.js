import React, { Component } from 'react';
import styles from './App.module.css'
import AppHeader from '../AppHeader/AppHeader'
import BurgerIngridients from '../BurgerIngredients/BurgerIngridients';
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'


class App extends Component {
  render() {
    return (
      <>
        <AppHeader />
        <main className={styles.main}>
          <BurgerIngridients />
          <BurgerConstructor />
        </main>
      </>
    );
  }
}

export default App;