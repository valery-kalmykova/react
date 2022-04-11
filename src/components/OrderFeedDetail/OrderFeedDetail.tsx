import React from 'react';
import styles from './OrderFeedDetail.module.css';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import illustration from '../../images/illustration.png';

const IngredientInOrder = () => {
  return (
    <li className={styles.item + ' mb-4 mr-6'}>
      <img src={illustration} alt="" className={styles.image}/>
      <p className="text text_type_main-default ml-4">Флюоресцентная булка R2-D3</p>
      <div className={styles.itemTotals}>
        <p className="text text_type_digits-default pl-4">2</p>
        <p className="text text_type_digits-default">x</p>
        <p className="text text_type_digits-default">20</p>
        <CurrencyIcon type="primary" />
      </div>
    </li>
  )
}

const OrderFeedDetail = () => {
  return( 
    <div className={styles.container}>      
      <p className="text text_type_main-medium mb-3 mt-10">Black Hole Singularity острый бургер</p>
      <p className="text text_type_main-small mb-15"
      style={{color: '#00CCCC'}}
      >Выполнен</p>
      <p className="text text_type_main-medium mb-6">Состав:</p>
      <ul className={styles.scrollContainer}>
        <IngredientInOrder/>
        <IngredientInOrder/>
        <IngredientInOrder/>
        <IngredientInOrder/>
        <IngredientInOrder/>
        <IngredientInOrder/>
      </ul>
      <div className={styles.totals + ' mt-10'}>
        <p className="text text_type_main-small text_color_inactive">Вчера, 13:50 i-GMT+3</p>
        <p className={styles.totalPrice + " text text_type_digits-default mr-2"}>510</p>
        <CurrencyIcon type="primary" />
      </div>
    </div>
  )
}

export default OrderFeedDetail;