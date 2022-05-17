import React from 'react';
import styles from './OrderFeedDetail.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { order, menuItemProp } from '../../utils/constants';
import { useSelector } from '../../services/hooks/hooks';
import { fotmatDate, useFormatStatus } from '../../utils/functions';

interface IngredientInOrderProps {
  element: menuItemProp
}

const IngredientInOrder = ({element}: IngredientInOrderProps) => {
  return (
    <li className={styles.item + ' mb-4 mr-6'}>
      <img src={element.image} alt={element.name} className={styles.image}/>
      <p className="text text_type_main-default ml-4">{element.name}</p>
      <div className={styles.itemTotals}>
        <p className="text text_type_digits-default pl-4">{element.__v}</p>
        <p className="text text_type_digits-default">x</p>
        <p className="text text_type_digits-default">{element.price}</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}

interface OrderFeedDetailProps {
  order: order
}

const OrderFeedDetail = ({order}: OrderFeedDetailProps) => {
  const productData = useSelector(state => state.products.productData);
  const status = useFormatStatus(order);

  const ingredientsInOrder = productData
    .filter((element: menuItemProp) => order.ingredients.includes(element._id)) 
    .map((element: menuItemProp) => element && {...element, __v: order.ingredients.filter(id=>id===element._id).length})  
  
  const sumOrderPrice = () => {    
    return ingredientsInOrder.reduce((total: number, element: menuItemProp) => { return total + element.price*element.__v}, 0)
  }

  return( 
    <div className={styles.container}>      
      <p className="text text_type_main-medium mb-3 mt-10">{order.name}</p>
      <p className="text text_type_main-small mb-15"
        style={{color: status.color}}
      >{status.text}</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.scrollContainer}>
        {ingredientsInOrder.map((element: menuItemProp, index: number) => {
          return (<IngredientInOrder element={element} key={index}/>)
        })}               
      </ul>
      <div className={styles.totals + ' mt-10'}>
        <p className="text text_type_main-small text_color_inactive">{fotmatDate(order.createdAt)}</p>
        <p className={styles.totalPrice + " text text_type_digits-default mr-2"}>{sumOrderPrice()}</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default OrderFeedDetail;