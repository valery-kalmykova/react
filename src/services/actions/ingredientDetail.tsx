import { menuItemProp } from '../../utils/constants'

export const HANDLE_OPEN_INGREDIENT_DETAIL = 'HANDLE_OPEN_INGREDIENT_DETAIL';
export const HANDLE_CLOSE_INGREDIENT_DETAIL = 'HANDLE_CLOSE_INGREDIENT_DETAIL';

export const handleOpenIngredientDetail = (item: menuItemProp) => ({
  type: HANDLE_OPEN_INGREDIENT_DETAIL,
  payload: { item }  
});

export const handleCloseIngredientDetail = () => ({
  type: HANDLE_CLOSE_INGREDIENT_DETAIL  
});