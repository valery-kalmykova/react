import React from 'react';
import AppHeader from '../AppHeader/AppHeader'
import BurgerConstructor from '../BurgerConstructor/BurgerConstructor'
import BurgerIngredients from '../BurgerIngredients/BurgerIngredients'
import Modal from '../Modal/Modal'
import OrderDetails from '../OrderDetails/OrderDetails'
import IngredientDetails from '../IngredientDetails/IngredientDetails'
import appStyle from './App.module.css';
import { menuItemProp } from '../../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenIngredientDetail, handleCloseIngredientDetail } from '../../services/actions/ingredientDetail'
import { handleOpenOrder, handleCloseOrder } from '../../services/actions/order'
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_DRAGGED_ELEMENTS, INCREASE_COUNT_ELEMENTS_IN_ORDER, DELETE_PREV_BUN_ELEMENT} from '../../services/actions/products'


const App = () => { 
  const dispatch = useDispatch();

  interface RootState {
    ingredientDetail:{ 
      item: menuItemProp,
      isVisibleModal: boolean,
    },
    order: {
      order: number,
      isVisibleModal: boolean
    }
  }
  const itemIngredientDetail = useSelector((state: RootState) => state.ingredientDetail.item);
  const isVisibleModalIngredientDetail = useSelector((state: RootState) => state.ingredientDetail.isVisibleModal);

  const orderNumber = useSelector((state: RootState) => state.order.order);
  const isVisibleModalOrder = useSelector((state: RootState) => state.order.isVisibleModal); 

  const openIngredientDetail = (item: menuItemProp) => {    
    dispatch(handleOpenIngredientDetail(item))
  }  
  const closeIngredientDetail = () => {    
    dispatch(handleCloseIngredientDetail())
  }
  
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
    }
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
    <div className={appStyle.app}>
      <AppHeader /> 
        <DndProvider backend={HTML5Backend}>             
        <div className={appStyle.main}>
          <BurgerIngredients handleOpenModal={openIngredientDetail}/>
          <BurgerConstructor handleOpenModal={openOrder} onDropHandler={handleDrop}/>        
        </div>
        </DndProvider>
        {isVisibleModalIngredientDetail && <Modal title='Детали ингредиента' handleClose={closeIngredientDetail}>        
          <IngredientDetails item={itemIngredientDetail}/>
        </Modal>}
        {isVisibleModalOrder && <Modal title='' handleClose={closeOrder}>
          <OrderDetails orderNumber={orderNumber}/>        
        </Modal>}   
    </div>
  );
}

export default App;
