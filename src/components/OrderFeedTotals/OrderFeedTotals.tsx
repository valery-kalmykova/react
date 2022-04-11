import React from 'react';
import styles from './OrderFeedTotals.module.css';
import { useSelector } from 'react-redux';
import { RootState } from '../../services/reducers';

const OrderFeedTotals = () => {
  const orders = useSelector((state:RootState) => state.wsReducer.orders);
  const total = useSelector((state:RootState) => state.wsReducer.total);
  const totalToday = useSelector((state:RootState) => state.wsReducer.totalToday);
  const getOrdersSuccess = useSelector((state:RootState) => state.wsReducer.getOrdersSuccess); 

  if (getOrdersSuccess) {
    return (
      <div className={styles.columnRight + ' ml-15'}>
          <div className={styles.columnsInOrder + ' mb-15'}>
            <div className={styles.columnInOrder + ' mr-9'}>
              <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
              <ul className={styles.list}>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344531</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344532</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344533</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344534</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344535</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344536</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344537</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344538</li>
                <li className={styles.itemDone + " text text_type_digits-default mr-2"}>0344539</li>
              </ul>              
            </div>
            <div className={styles.columnInOrder}>
              <h3 className="text text_type_main-medium mb-6">В работе:</h3>
              <ul className={styles.list}>
                <li className={styles.item + " text text_type_digits-default mr-2"}>0344533</li>
              </ul>
            </div>
          </div>
          <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
          <p className="text text_type_digits-large mb-15">{total}</p>
          <h3 className="text text_type_main-medium">Выполнено за сегодня:</h3>
          <p className="text text_type_digits-large">{totalToday}</p>
        </div>
    )    
  }
  return null
}
export default OrderFeedTotals;