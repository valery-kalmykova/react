import React, {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import appStyle from './App.module.css';

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App =  React.memo(() => {
  const [state, setState] = useState({ 
    productData: []       
  })
  const [isVisibleIngDet, setIsVisibleIngDet] = useState(false);
  const [itemIngDet, setitemIngDet] = useState(null);
  const [isVisibleOrder, setIsVisibleOrder] = useState(false)

   useEffect(() => {
    const getProductData = async () => {
      setState({...state});
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const data = await res.json();
        setState({ productData: data.data });        
      } catch(err) {
        console.log(err)
      }           
    }
     getProductData();     
  }, [])

  const openIngDet = (item) => {
    setIsVisibleIngDet(true)
    setitemIngDet(item)
  }  
  const closeIngDet = () => {
    setIsVisibleIngDet(!isVisibleIngDet)
    setitemIngDet(null)
  }
  const toggleOrder = () => setIsVisibleOrder(!isVisibleOrder)

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <div className={appStyle.main}>
        <BurgerIngredients data={state.productData} handleOpenModal={openIngDet}/>
        <BurgerConstructor data={state.productData} handleOpenModal={toggleOrder}/>        
      </div>    
      {isVisibleIngDet && <Modal title='Детали ингредиента' handleClose={closeIngDet}>        
        <IngredientDetails item={itemIngDet}/>
      </Modal>}
      {isVisibleOrder && <Modal title='' handleClose={toggleOrder}>        
        <OrderDetails />        
      </Modal>}
    </div>
  );
})

export default App;
