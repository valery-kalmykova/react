import {
  HANDLE_OPEN_INGREDIENT_DETAIL,
  HANDLE_CLOSE_INGREDIENT_DETAIL
} from '../actions/ingredientDetail';
import { menuItemProp, itemDefault } from '../../utils/constants';
import type { IhandleIngredientDetailActions } from '../actions/ingredientDetail'

interface IinitialState { 
  item: menuItemProp,
  isVisibleModal: boolean 
}

const initialState:IinitialState = {
  item: itemDefault,
  isVisibleModal: false
}

export const ingredientDetailReducer = (state = initialState, action: IhandleIngredientDetailActions): IinitialState => {
  switch (action.type) {
    case HANDLE_OPEN_INGREDIENT_DETAIL: {
      return {
        ...state,
        item: action.payload.item,
        isVisibleModal: true
      }
    }
    case HANDLE_CLOSE_INGREDIENT_DETAIL: {
      return {
        ...state,
        item: itemDefault,
        isVisibleModal: false
      }
    }
    default: {
      return state;
    }
  }
}