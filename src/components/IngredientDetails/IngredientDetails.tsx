import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyle from './IngredientDetails.module.css';
import {menuItemPropTypes} from '../../utils/constants'

const IngredientDetails = ({item}) => {
  
  return (
    <div className={ingredientDetailsStyle.content}>      
      <img src={item.image_large} alt={item.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{item.name}</p>
      <ul className={ingredientDetailsStyle.items + ' pb-15'}>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{item.calories}</p>
        </li>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.proteins}</p>
        </li>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.fat}</p>
        </li>
        <li className={ingredientDetailsStyle.item}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{item.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {
  item: menuItemPropTypes
}

export default IngredientDetails;