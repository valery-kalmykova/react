import React, { useCallback} from 'react';
import styles from './OrderFeed.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { order, menuItemProp } from '../../utils/constants';
import { fotmatDate, useFormatStatus } from '../../utils/functions';

interface OrderCardProps {
  order: order,
  path: string
}
const OrderCard = ({order, path}: OrderCardProps) => {  
  const location = useLocation();
  const history = useHistory();
  const ordersProfilePath = (location.pathname === '/profile/orders');
  const productData = useSelector((state:RootState) => state.products.productData);
  const numberImagesToDisplay = 5;
  const status = useFormatStatus(order);
  
  const onClick = useCallback(
    () => {
        history.replace({ 
          pathname: `${path}${order._id}`, 
          state: { background: location } 
        });        
    },
    [history, location]
  );
  
  const ingredientsInOrder = productData
    .filter((element: menuItemProp) => order.ingredients.includes(element._id)) 
    .map((element: menuItemProp) => element && {...element, __v: order.ingredients.filter(id=>id===element._id).length})  
  
  const sumOrderPrice = () => {    
    return ingredientsInOrder.reduce((total: number, element: menuItemProp) => { return total + element.price*element.__v}, 0)
  }

  return (
    <div className={styles.card + ' p-6 ml-5 mr-2 mb-6'} onClick={onClick}>
      <div className={styles.cardDetail + ' mb-6'}>
        <p className='text text_type_digits-default'>{'#'+order.number}</p>
        <p className='text text_type_main-default text_color_inactive'>{fotmatDate(order.createdAt)}</p>
      </div>
      <p className='text text_type_main-medium'>{order.name}</p>
      {ordersProfilePath && <p className='text text_type_main-default mt-2' style={{'color' : status.color}}>{status.text}</p>}
      <div className={styles.bottomLine + ' mt-6'}>
        <div className={styles.images}>
          { ingredientsInOrder.length > numberImagesToDisplay &&
            <div className={styles.imageContainer}>
            <img src={ingredientsInOrder[numberImagesToDisplay].image} alt={ingredientsInOrder[numberImagesToDisplay].name} className={styles.imageWithNumber + ' ' + styles.image}/>
            <p className={styles.imageText + ' text text_type_digits-default'}>{'+' + (ingredientsInOrder.length-numberImagesToDisplay)}</p>
          </div>}               
          { ingredientsInOrder.length < numberImagesToDisplay
            ? ingredientsInOrder.map((element: menuItemProp, index: number) => {
                return (<img src={element.image} alt={element.name} className={styles.image+ ' ' + styles.imagePosition} key={index}/>)
              })
            : ingredientsInOrder.slice(0, numberImagesToDisplay).map((element: menuItemProp, index: number) => {
                return (<img src={element.image} alt={element.name} className={styles.image+ ' ' + styles.imagePosition} key={index}/>)
              })               
          }       
        </div>
        <div className={styles.price + ' ml-6'}>
          <p className='text text_type_digits-default mr-2'>{sumOrderPrice()}</p>
          <CurrencyIcon type="primary" />
        </div>
      </div>
    </div>
  )
}

interface OrderFeedProps {
  path: string
}

const OrderFeed = ({path}: OrderFeedProps) => {
  const orders = useSelector((state:RootState) => state.wsReducer.orders);
  const getOrdersSuccess = useSelector((state:RootState) => state.wsReducer.getOrdersSuccess);
  
  if (getOrdersSuccess) {
    return (
      <div className={styles.section}>
        {orders.sort((a: order, b: order) => {
          return b.number - a.number
        })
          .map((order: order) => {
          return <OrderCard order={order} key={order._id} path={path}/>
        })
        }        
      </div>
    )
  }
  return null
}

export default OrderFeed;