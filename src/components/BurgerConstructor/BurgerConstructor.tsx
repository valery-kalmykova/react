import React, {useEffect, useState, useCallback } from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderNumber } from '../../services/actions/order';
import { menuItemProp } from '../../utils/constants';
import { useDrop } from "react-dnd";
import { useHistory } from 'react-router-dom';
import update from 'immutability-helper';
import { 
  DELETE_DRAGGED_ELEMENTS, 
  DECREASE_COUNT_ELEMENTS_IN_ORDER, 
  SORT_INGRIDIENTS_IN_CONSTRUCTOR,
} from '../../services/actions/products';
import CurrentBunElement from './BunElement';
import CurrentNotBunElement from './NotBunElement';

interface BurgerConstructorProps {
  handleOpenModal: (orderNumber: number) => void,
  onDropHandler: (dataElement: menuItemProp) => void
}

interface RootState {
  products:{
    notBunIngridientsInOrder: menuItemProp[],
    bunIngridientInOrder: menuItemProp[], 
    productData: menuItemProp[]
  },  
  order: {
    order: number
  }
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({handleOpenModal, onDropHandler}) => {  
  const dispatch = useDispatch();  
  const history = useHistory();
  const bunIngridientInOrder = useSelector((state: RootState) => state.products.bunIngridientInOrder);
  const notBunIngridientsInOrder = useSelector((state: RootState) => state.products.notBunIngridientsInOrder);
  const productData = useSelector((state: RootState) => state.products.productData);
  const orderNumber = useSelector((state: RootState) => state.order.order);
  const [ totalPrice, setTotalPrice ] = useState(0);
  const isUserLoaded = localStorage.getItem('accessToken');  
  const disabled = (totalPrice === 0 || bunIngridientInOrder.length === 0);
   
  const [, dropTarget] = useDrop({
    accept: "item",    
    drop(dataElement: menuItemProp) {
        onDropHandler(dataElement);        
    }        
  }); 
  
  useEffect(
    () => { 
      const totalnotBunIngridients = notBunIngridientsInOrder.reduce((total: number, dataElement) => { return total + dataElement.price}, 0);
      const bunIngridient = bunIngridientInOrder.reduce((total: number, dataElement) => { return total + dataElement.price}, 0)    
      setTotalPrice(totalnotBunIngridients + bunIngridient);   
    }, [setTotalPrice, notBunIngridientsInOrder, bunIngridientInOrder]
  ); 

  const getIdsInOrder = useCallback((productData: menuItemProp[]) => {
    const newArr: string[] = []
    productData.map((dataElement: menuItemProp) => {
      const countMinItemInOrder = 1;      
      if (dataElement.__v >= countMinItemInOrder) {
        newArr.push(dataElement._id)           
      }
    })    
    return newArr
  },[])
   
  const onClickOrderHandler = useCallback(() => {     
    if(!isUserLoaded) {
      history.replace({ pathname: '/login' });
    } else {     
      const idInOrder: string[] = getIdsInOrder(productData);     
      dispatch(getOrderNumber(idInOrder));    
      handleOpenModal(orderNumber); 
    }       
  },[getIdsInOrder, dispatch, handleOpenModal, orderNumber, productData, history, isUserLoaded])


  const onClickDelete = (dataElement: menuItemProp, key: number) => {
    dispatch({
      type: DECREASE_COUNT_ELEMENTS_IN_ORDER,
      dataElement
    });    
    dispatch({
      type: DELETE_DRAGGED_ELEMENTS,
      dataElement
    })    
  }

  const moveCard = useCallback((dragIndex: number, hoverIndex: number) => {     
    const newSortIndridients = update(notBunIngridientsInOrder, {
      $splice: [
        [dragIndex, 1],
        [hoverIndex, 0, notBunIngridientsInOrder[dragIndex] as menuItemProp],
      ],
    });    
    dispatch({
      type: SORT_INGRIDIENTS_IN_CONSTRUCTOR,
      newSortIndridients
    }) 
  }, [dispatch, notBunIngridientsInOrder])  
 
   return (
    <section className={burgerConstructorStyles.section + ' ml-4'} ref={dropTarget}>
      <ul className={burgerConstructorStyles.elementsList + ' mt-25'}> 

        {bunIngridientInOrder.map((dataElement, index) => {
          return (
            <CurrentBunElement type='top' typeText=' верх' key={index} dataElement={dataElement}/>
          ) 
        })}        

        <ul className={burgerConstructorStyles.scrollSection + ' pr-4'}>
          {notBunIngridientsInOrder.map((dataElement, index) => {            
            return (
              <CurrentNotBunElement 
                dataElement={dataElement} 
                key={dataElement.uuid}
                id={dataElement._id}
                index={index} 
                onClickdelete={()=>onClickDelete(dataElement, index)}                      
                moveCard={moveCard}            
              />
            )         
          })}
        </ul>

        {bunIngridientInOrder.map((dataElement, index) => {
          return (
            <CurrentBunElement type='bottom' typeText=' низ' key={index} dataElement={dataElement}/>
          )
        })} 
      
      </ul>
      <div className={burgerConstructorStyles.totals + ' mt-10'}>
        <div className={burgerConstructorStyles.totalPrice + ' mr-10'}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>          
        <Button type="primary" size="large" onClick={onClickOrderHandler} disabled={disabled}>Оформить заказ</Button>
      </div>

    </section>      
  )
}

export default BurgerConstructor;