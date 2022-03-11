import {
  HANDLE_OPEN_INGREDIENT_DETAIL,
  HANDLE_CLOSE_INGREDIENT_DETAIL
} from '../actions/ingredientDetail';
import { AnyAction } from 'redux';
import { menuItemProp, itemDefault } from '../../utils/constants';

interface iinitialState { 
  item: menuItemProp,
  isVisibleModal: boolean 
}

const initialState:iinitialState = {
  item: itemDefault,
  isVisibleModal: false
}

export const ingredientDetailReducer = (state = initialState, action: AnyAction) => {
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