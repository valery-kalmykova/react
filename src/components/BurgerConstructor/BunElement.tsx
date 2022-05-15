import React from 'react';
import burgerConstructorStyles from './BurgerConstructor.module.css';
import { ConstructorElement} from '@ya.praktikum/react-developer-burger-ui-components';
import { menuItemProp } from '../../utils/constants';


interface CurrentBunElementProps {
  type: "top" | "bottom" | undefined,
  typeText: string,
  dataElement: menuItemProp
}

const CurrentBunElement = ({type, typeText, dataElement}:CurrentBunElementProps) => {    
  
  return (
    <li className={burgerConstructorStyles.constructorElementLocked + ' ml-8'}>
      <ConstructorElement
        type={type}
        isLocked={true}
        text={dataElement.name + typeText}
        price={dataElement.price}
        thumbnail={dataElement.image}
      />          
    </li>
  )
}

export default CurrentBunElement;