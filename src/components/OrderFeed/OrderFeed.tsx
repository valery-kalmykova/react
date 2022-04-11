import React, { useCallback, useEffect, useState } from 'react';
import styles from './OrderFeed.module.css';
import { useLocation, useHistory } from 'react-router-dom';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';
import { order, menuItemProp } from '../../utils/constants';

const OrderCard = ({order}) => {  
  const location = useLocation();
  const history = useHistory();
  const ordersProfilePath = (location.pathname === '/profile/orders');
  const productData = useSelector((state:RootState) => state.products.productData);
  const numberImagesToDisplay = 5;
  const [convertedStatus, setConvertedStatus] = useState({
    text: '',
    color: ''
  })
  
  const onClickHandler = useCallback(
    () => {
        // history.replace({ 
        //   pathname: `/feedid`, 
        //   // state: { background: location } 
        // });        
    },
    [history, location]
  );

  useEffect (
      () => {
        if (order.status === 'done') {
          setConvertedStatus({
            ...convertedStatus,
            text: 'Выполнен',
            color: 'var(--text-primary-color)'
          })
          } else if (order.status === 'pending') {
            setConvertedStatus({
              ...convertedStatus,
              text: 'Готовится',
              color: '#00CCCC'
            })
          } else if (order.status === 'created') {
            setConvertedStatus({
              ...convertedStatus,
              text: 'Создан',
              color: 'var(--text-primary-color)'
            })
          } else {
            setConvertedStatus({
              ...convertedStatus,
              text: 'Отменён',
              color: 'var(--colors-interface-error)'
            })
          }
      }, [order]
    )
 
  const ingredientsInOrder = productData.filter((element: menuItemProp) => order.ingredients.includes(element._id))

  const sumOrderPrice = () => {    
    return ingredientsInOrder.reduce((total: number, element: menuItemProp) => { return total + element.price}, 0)
  }

  return (
    <div className={styles.card + ' p-6 ml-5 mr-2 mb-6'} onClick={onClickHandler}>
      <div className={styles.cardDetail + ' mb-6'}>
        <p className='text text_type_digits-default'>{'#'+order.number}</p>
        <p className='text text_type_main-default text_color_inactive'>{order.createdAt}</p>
      </div>
      <p className='text text_type_main-medium'>{order.name}</p>
      {ordersProfilePath && <p className='text text_type_main-default mt-2' style={{'color' : convertedStatus.color}}>{convertedStatus.text}</p>}
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

const OrderFeed = () => {
  const orders = useSelector((state:RootState) => state.wsReducer.orders);
  const getOrdersSuccess = useSelector((state:RootState) => state.wsReducer.getOrdersSuccess);

  if (getOrdersSuccess) {
    return (
      <div className={styles.section}>
        {orders.map((order: order) => {
          return <OrderCard order={order} key={order._id}/>
        })
        }        
      </div>
    )
  }
  return null
}

export default OrderFeed;