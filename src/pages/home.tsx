import React from 'react';
import BurgerConstructor from '../components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from '../components/BurgerIngredients/BurgerIngredients';
import Modal from '../components/Modal/Modal';
import OrderDetails from '../components/OrderDetails/OrderDetails';
import IngredientDetails from '../components/IngredientDetails/IngredientDetails';
import homeStyle from './home.module.css';
import { menuItemProp } from '../utils/constants'
import { useDispatch, useSelector } from 'react-redux';
import { handleOpenIngredientDetail, handleCloseIngredientDetail } from '../services/actions/ingredientDetail';
import { handleOpenOrder, handleCloseOrder } from '../services/actions/order';
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { ADD_DRAGGED_ELEMENTS, INCREASE_COUNT_ELEMENTS_IN_ORDER, DELETE_PREV_BUN_ELEMENT, setKeyValue} from '../services/actions/products';
import { Loader } from '../ui/Loader/Loader'


const HomePage = () => { 
  const dispatch = useDispatch();

  interface RootState {
    ingredientDetail:{ 
      item: menuItemProp,
      isVisibleModal: boolean,
    },
    order: {
      orderNumber: number,
      isVisibleModalOrder: boolean,
      orderRequest: boolean
    }
  }
  const itemIngredientDetail = useSelector((state: RootState) => state.ingredientDetail.item);
  const isVisibleModalIngredientDetail = useSelector((state: RootState) => state.ingredientDetail.isVisibleModal);

  const {orderNumber, orderRequest, isVisibleModalOrder} = useSelector((state: RootState) => state.order);
 

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
      <div className={homeStyle.main}>
        <BurgerIngredients handleOpenModal={openIngredientDetail}/>
        <BurgerConstructor handleOpenModal={openOrder} onDropHandler={handleDrop}/>        
      </div>
      </DndProvider>
      {isVisibleModalIngredientDetail && <Modal title='Детали ингредиента' handleClose={closeIngredientDetail}>        
        <IngredientDetails item={itemIngredientDetail}/>
      </Modal>}
      {isVisibleModalOrder && <Modal title='' handleClose={closeOrder}>
        {orderRequest ? <Loader size="large" inverse={true}/> : <OrderDetails orderNumber={orderNumber}/>}        
      </Modal>}   
    </>
  );
}

export default HomePage;
