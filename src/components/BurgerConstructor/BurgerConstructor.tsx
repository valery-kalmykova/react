import React, {useEffect, useContext, useState, useCallback} from 'react';
import PropTypes from 'prop-types';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import {menuItemPropTypes} from '../../utils/constants'
import { DataContext } from '../../services/dataContext';


const BurgerConstructor = ({handleOpenModal}) => {  
  const { productData, setData } = useContext(DataContext);

  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ idInOrder, setIdInOrder ] = useState(["60d3b41abdacab0026a733c6","60d3b41abdacab0026a733c8"]) //id для примера, потом удалить

  useEffect(
    () => {
      let total = 0;
      productData.map(dataElement => (total += dataElement.price * dataElement.__v));
      setTotalPrice(total);
    },
    [productData, setTotalPrice]
  );

  useEffect (
    () => {      
      productData.map(dataElement => {
        if (dataElement.__v >= 1) {
          setIdInOrder([...idInOrder, dataElement.id])
        }
      })
    }
  )

  const sendOrder = useCallback(  
    async () => {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "ingredients": idInOrder })
      };    
      const url = 'https://norma.nomoreparties.space/api/orders' 
      try {
        const res = await fetch(url, requestOptions);
        if (!res.ok) {
          throw new Error('Ответ сети был не ok.');
        }
        const order = await res.json();
        handleOpenModal(order.order.number)
      }
      catch(err) {
        console.log(err)        
      }
    }, [idInOrder, handleOpenModal]
  )

  return (
    <section className={burgerConstructorStyles.section + ' ml-4'}>
      <ul className={burgerConstructorStyles.elementsList + ' mt-25'}> 

        {productData.map(dataElement => {          
          if (dataElement.__v >= 1 && dataElement.type === 'bun') {
            return <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
            <ConstructorElement
              type='top'
              isLocked={true}
              text={dataElement.name + ' верх'}
              price={dataElement.price}
              thumbnail={dataElement.image}
            />
          </li>
          }       
        })}

        <ul className={burgerConstructorStyles.scrollSection + ' pr-4'}>
          {productData.map((dataElement, index) => {            
            if (dataElement.__v >= 1 && dataElement.type !== 'bun') {
              return <li className={burgerConstructorStyles.constructorElement} key={index}>
              <DragIcon type="primary" />
              <ConstructorElement    
                text={dataElement.name}
                price={dataElement.price}
                thumbnail={dataElement.image}
              />
            </li>
            }
          })}
        </ul>

        {productData.map(dataElement => {
          if (dataElement.__v >= 1 && dataElement.type === 'bun') {
            return <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={dataElement.name + ' низ'}
              price={dataElement.price}
              thumbnail={dataElement.image}
            />
          </li>
          }
        })}
      
      </ul>
      <div className={burgerConstructorStyles.totals + ' mt-10'}>
        <div className={burgerConstructorStyles.totalPrice + ' mr-10'}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>          
        <Button type="primary" size="large" onClick={() => sendOrder()}>Оформить заказ</Button>
      </div>

    </section>      
  )
}

BurgerConstructor.propTypes = {
  productData: PropTypes.arrayOf(menuItemPropTypes.isRequired),  
}

export default BurgerConstructor;