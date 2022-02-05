import React from 'react';
import PropTypes from 'prop-types';
import ingredientDetailsStyle from './IngredientDetails.module.css';

const IngredientDetails = props => {
  return (
    <div className={ingredientDetailsStyle.content}>
      <p className={ingredientDetailsStyle.title + " text text_type_main-large pt-10 pl-10"}>Детали ингредиента</p>
      <img src={props.image_large} alt={props.name} />
      <p className="text text_type_main-medium mt-4 mb-8">{props.name}</p>
      <ul className={ingredientDetailsStyle.items + ' pb-15'}>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Калории,ккал</p>
          <p className="text text_type_digits-default text_color_inactive">{props.calories}</p>
        </li>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Белки, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.proteins}</p>
        </li>
        <li className={ingredientDetailsStyle.item + ' mr-5'}>
          <p className="text text_type_main-small text_color_inactive">Жиры, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.fat}</p>
        </li>
        <li className={ingredientDetailsStyle.item}>
          <p className="text text_type_main-small text_color_inactive">Углеводы, г</p>
          <p className="text text_type_digits-default text_color_inactive">{props.carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

IngredientDetails.propTypes = {  
  name: PropTypes.string.isRequired,
  calories: PropTypes.number.isRequired,
  proteins: PropTypes.number.isRequired,
  fat: PropTypes.number.isRequired,
  carbohydrates: PropTypes.number.isRequired,
  image: PropTypes.string.isRequired
}

export default IngredientDetails;