import React, {useEffect, useState} from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import appStyle from './App.module.css';
import { DataContext } from '../../services/dataContext';
import { menuItemProp, itemDefault } from '../../utils/constants'

const url = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {  
  const [productData, setData] = useState<menuItemProp[]>([]);
  const [isVisibleIngDet, setIsVisibleIngDet] = useState(false);
  const [itemIngDet, setitemIngDet] = useState<menuItemProp>(itemDefault);
  const [isVisibleOrder, setIsVisibleOrder] = useState(false)
  const [orderNumber, setOrderNumber] = useState(0);

   useEffect(() => {
    const getProductData = async () => {      
      try {
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const data = await res.json();
        setData(data.data);               
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
    setIsVisibleIngDet(false)
    setitemIngDet(itemDefault)
  }
  
  const openOrder = (orderNumber) => {
    setIsVisibleOrder(true)
    setOrderNumber(orderNumber)
  }
  const closeOrder = () => {
    setIsVisibleOrder(false)
    setOrderNumber(0)
  }

  return (
    <div className={appStyle.app}>
      <AppHeader />
      <DataContext.Provider value={{ productData, setData }}>        
        <div className={appStyle.main}>
          <BurgerIngredients handleOpenModal={openIngDet}/>
          <BurgerConstructor handleOpenModal={openOrder}/>        
        </div>    
      </DataContext.Provider>
        {isVisibleIngDet && <Modal title='Детали ингредиента' handleClose={closeIngDet}>        
          <IngredientDetails item={itemIngDet}/>
        </Modal>}
        {isVisibleOrder && <Modal title='' handleClose={closeOrder}>
          <OrderDetails orderNumber={orderNumber}/>        
        </Modal>}   
    </div>
  );
}

export default App;
