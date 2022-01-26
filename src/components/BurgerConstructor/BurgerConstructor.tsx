import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/img.svg'

class BurgerConstructor extends React.Component { 

  render() {
    return (
      <section className={burgerConstructorStyles.section + ' ml-4'}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className='mt-25 ml-8'>
          <ConstructorElement
            type="top"
            isLocked={true}
            text="Краторная булка N-200i (верх)"
            price={200}
            thumbnail={img}
          />
          <div className={burgerConstructorStyles.scrollSection}>
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={img}
            />
            <ConstructorElement
              text="Краторная булка N-200i (верх)"
              price={50}
              thumbnail={img}
            />
          </div>          
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text="Краторная булка N-200i (низ)"
            price={200}
            thumbnail={img}
          />
        </div>
        <div className={burgerConstructorStyles.totals + ' mt-10'}>
          <div className={burgerConstructorStyles.totalPrice + ' mr-10'}>
            <p className="text text_type_digits-medium mr-2">610</p>
            <CurrencyIcon type="primary" />
          </div>          
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </section>      
    )
  }
}

export default BurgerConstructor;