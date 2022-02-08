import React from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/img.svg'

const ConstructorEl = props => {
  return <li className={burgerConstructorStyles.constructorElement}>
    <DragIcon type="primary" />
    <ConstructorElement    
      text={props.name}
      price={props.price}
      thumbnail={props.image}
    />
  </li>
}

ConstructorEl.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
}

const BurgerConstructor = ({data, handleOpenModal}) => {
  
  
  return (
    <section className={burgerConstructorStyles.section + ' ml-4'}>
      <ul className={burgerConstructorStyles.elementsList + ' mt-25'}>
        <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />          
        </li>          
        <ul className={burgerConstructorStyles.scrollSection + ' pr-4'}>
          {data.map(dataElement => {
            if (dataElement.__v >= 0 && (dataElement.type === 'main' || dataElement.type === 'sauce')) {
              return <ConstructorEl {...dataElement} key={dataElement._id}/>
            }      
          })}                        
        </ul> 
        <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}              
          />
        </li>  
      </ul>
      <div className={burgerConstructorStyles.totals + ' mt-10'}>
        <div className={burgerConstructorStyles.totalPrice + ' mr-10'}>
          <p className="text text_type_digits-medium mr-2">610</p>
          <CurrencyIcon type="primary" />
        </div>          
        <Button type="primary" size="large" onClick={handleOpenModal}>Оформить заказ</Button>
      </div>
    </section>      
  )
}

BurgerConstructor.propTypes = {
  data: PropTypes.array.isRequired
}

export default BurgerConstructor;