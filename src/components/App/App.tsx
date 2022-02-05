import React, {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import ModalOverlay from '../ModalOverlay/ModalOverlay'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import appStyle from './App.module.css';

const App =  React.memo(() => {
  const [state, setState] = useState({ 
    productData: []       
  })
  const [isVisible, setIsVisible] = useState(false)

   useEffect(() => {
    const getProductData = async () => {
      setState({...state});
      try {
        const res = await fetch(`https://norma.nomoreparties.space/api/ingredients`);
        const data = await res.json();
        setState({ productData: data.data });        
      } catch(err) {
        console.log(err)
      }           
    }
     getProductData();     
  }, [])

  const open = () => setIsVisible(true)

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <div className={appStyle.main}>
        <BurgerIngredients data={state.productData}/>
        <BurgerConstructor data={state.productData}/>        
      </div>      
      <ModalOverlay>
        <IngredientDetails {...state.productData[0]}/>
      </ModalOverlay>
      
    </div>
  );
})

export default App;
