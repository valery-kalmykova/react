import React from 'react';
import PropTypes from 'prop-types';
import orderDetailsStyle from './OrderDetails.module.css';
import orderAccepted from '../../images/orderAccepted.svg'

const OrderDetails = ({orderNumber}) => {
  return (
    <div className={orderDetailsStyle.content}>
          <p className="text text_type_digits-large">{orderNumber}</p>
          <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
          <img src={orderAccepted} alt="Заказ принят" className='mt-15'/>
          <p className="text text_type_main-default mt-15">Ваш заказ начали готовить</p>
          <p className="text text_type_main-default text_color_inactive mt-2 pb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
  )
}

OrderDetails.propTypes = {
  orderNumber: PropTypes.number.isRequired, 
}

export default OrderDetails