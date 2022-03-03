import React, {useEffect, useContext, useState, useCallback} from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement, CurrencyIcon, Button, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/products'
import { menuItemProp } from '../../utils/constants'

interface CurrentBunElementProps {
  type: "top" | "bottom" | undefined,
  typeText: string,
  dataElement: menuItemProp,
}

const CurrentBunElement = ({type, typeText, dataElement}:CurrentBunElementProps): JSX.Element | null => {    
  if (dataElement.type === 'bun') {
    return <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
        <ConstructorElement
          type={type}
          isLocked={true}
          text={dataElement.name + typeText}
          price={dataElement.price}
          thumbnail={dataElement.image}
        />
      </li>
  }
  return null 
}

interface CurrentnotBunElementProps {
  dataElement: menuItemProp,    
}

const CurrentNotBunElement = ({dataElement}: CurrentnotBunElementProps): JSX.Element | null => {
  if (dataElement.type !== 'bun') {
    return <li className={burgerConstructorStyles.constructorElement}>
    <DragIcon type="primary" />
    <ConstructorElement    
      text={dataElement.name}
      price={dataElement.price}
      thumbnail={dataElement.image}
    />
  </li>
  }
  return null
}

interface BurgerConstructorProps {
  handleOpenModal: (orderNumber: number) => void
}

interface RootState {
  products:{ 
    productData: menuItemProp[]
  }
}

const BurgerConstructor: React.FC<BurgerConstructorProps> = ({handleOpenModal}) => {  
  const dispatch = useDispatch();
  const productData = useSelector((state:RootState) => state.products.productData);

  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  const [ totalPrice, setTotalPrice ] = useState(0);
  const [ idInOrder, setIdInOrder ] = useState([
    '60d3b41abdacab0026a733c6', 
    '60d3b41abdacab0026a733c8', 
    '60d3b41abdacab0026a733cc',
    '60d3b41abdacab0026a733cd',
    '60d3b41abdacab0026a733d0',
    '60d3b41abdacab0026a733d3'
  ]) //id для примера, потом удалить

  const filteredElementsInOrder = productData.filter(dataElement => idInOrder.includes(dataElement._id));
  
  useEffect(
    () => { 
      const total = filteredElementsInOrder.reduce((total: number, dataElement) => { return total + dataElement.price}, 0)
      setTotalPrice(total);
    },
    [productData, setTotalPrice, filteredElementsInOrder]
  );

  useEffect (
    () => {      
      productData.map(dataElement => {
        const countMinItemInOrder = 1;
        if (dataElement.__v >= countMinItemInOrder) {
          setIdInOrder([...idInOrder, dataElement._id])
        }
      })
    }, [productData, setIdInOrder, idInOrder]
  )
 
  const onClickHandler = useCallback(  
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

        {filteredElementsInOrder.map((dataElement, index) => {
          return <CurrentBunElement type='top' typeText=' верх' key={index} dataElement={dataElement}/>
        })}        

        <ul className={burgerConstructorStyles.scrollSection + ' pr-4'}>
          {filteredElementsInOrder.map((dataElement, index) => {            
            return <CurrentNotBunElement dataElement={dataElement} key={index}/>         
          })}
        </ul>

        {filteredElementsInOrder.map((dataElement, index) => {
          return <CurrentBunElement type='bottom' typeText=' низ' key={index} dataElement={dataElement}/>
        })} 
      
      </ul>
      <div className={burgerConstructorStyles.totals + ' mt-10'}>
        <div className={burgerConstructorStyles.totalPrice + ' mr-10'}>
          <p className="text text_type_digits-medium mr-2">{totalPrice}</p>
          <CurrencyIcon type="primary" />
        </div>          
        <Button type="primary" size="large" onClick={onClickHandler}>Оформить заказ</Button>
      </div>

    </section>      
  )
}

export default BurgerConstructor;