import React from 'react';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import Modal from '../components/Modal/Modal';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import styles from './pages.module.css';
import { menuItemProp } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenOrder, handleCloseOrder } from '../services/actions/order';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_DRAGGED_ELEMENTS, INCREASE_COUNT_ELEMENTS_IN_ORDER, DELETE_PREV_BUN_ELEMENT, setKeyValue} from '../services/actions/products';
import { Loader } from '../ui/Loader/Loader';
import { RootState } from '../services/reducers';

const HomePage = () => { 
  const dispatch = useDispatch();

  const {orderNumber, orderRequest, isVisibleModalOrder} = useSelector((state: RootState) => state.order);
  
  const openOrder = (orderNumber: number) => {
    dispatch(handleOpenOrder(orderNumber))
  }
  const closeOrder = () => {
    dispatch(handleCloseOrder())
  }

  const handleDrop = (dataElement: menuItemProp) => {
    if (dataElement.type === 'bun') {
      dispatch({
        type: DELETE_PREV_BUN_ELEMENT
      })
    }; 
    dispatch(setKeyValue(dataElement));
    dispatch({
      type: ADD_DRAGGED_ELEMENTS,
      dataElement
    });    
    dispatch({
      type: INCREASE_COUNT_ELEMENTS_IN_ORDER,
      dataElement
    });     
  };

  return (
    <>     
      <DndProvider backend={HTML5Backend}>             
      <div className={styles.mainHome}>
        <BurgerIngredients />
        <BurgerConstructor handleOpenModal={openOrder} onDropHandler={handleDrop}/>        
      </div>
      </DndProvider>      
      {isVisibleModalOrder && <Modal title='' handleClose={closeOrder}>
        {orderRequest ? <Loader size="large" inverse={true}/> : <OrderDetails orderNumber={orderNumber}/>}        
      </Modal>}   
    </>
  );
}

export default HomePage;
