import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import img from '../../images/img.svg'
import ddicon from '../../images/ddicon.svg'

class BurgerConstructor extends React.Component { 

  render() {
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
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li>
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li>           
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
            <li className={burgerConstructorStyles.constructorElement}>
              <img src={ddicon} alt="Drag and Drop icon" className='mr-2'/>
              <ConstructorElement
                text="Краторная булка N-200i (верх)"
                price={50}
                thumbnail={img}
              />
            </li> 
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
          <Button type="primary" size="large">Оформить заказ</Button>
        </div>
      </section>      
    )
  }
}

export default BurgerConstructor;