import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import appStyle from './App.module.css';

function App() {
  return (
    <div className={appStyle.app}>
      <AppHeader></AppHeader>
      <div className={appStyle.main}>
        <BurgerIngredients></BurgerIngredients>
        <BurgerConstructor></BurgerConstructor>        
      </div>
      
    </div>
  );
}

export default App;
