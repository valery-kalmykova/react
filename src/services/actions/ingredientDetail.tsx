import { menuItemProp } from '../../utils/constants'

export const HANDLE_OPEN_INGREDIENT_DETAIL: 'HANDLE_OPEN_INGREDIENT_DETAIL' = 'HANDLE_OPEN_INGREDIENT_DETAIL';
export const HANDLE_CLOSE_INGREDIENT_DETAIL: 'HANDLE_CLOSE_INGREDIENT_DETAIL' = 'HANDLE_CLOSE_INGREDIENT_DETAIL';

interface IhandleOpenIngredientDetail {
  readonly type: typeof HANDLE_OPEN_INGREDIENT_DETAIL;
  readonly payload: {
    item: menuItemProp
  }
}

interface IhandleCloseIngredientDetail {
  readonly type: typeof HANDLE_CLOSE_INGREDIENT_DETAIL;
}

export type IhandleIngredientDetailActions = 
| IhandleOpenIngredientDetail
| IhandleCloseIngredientDetail

export const handleOpenIngredientDetail = (item: menuItemProp): IhandleIngredientDetailActions => ({
  type: HANDLE_OPEN_INGREDIENT_DETAIL,
  payload: { item }
});

export const handleCloseIngredientDetail = (): IhandleIngredientDetailActions => ({
  type: HANDLE_CLOSE_INGREDIENT_DETAIL  
});