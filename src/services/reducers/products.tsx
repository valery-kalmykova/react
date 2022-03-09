import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_DRAGGED_ELEMENTS,
  DELETE_DRAGGED_ELEMENTS,
  DELETE_PREV_BUN_ELEMENT,
  INCREASE_COUNT_ELEMENTS_IN_ORDER,
  DECREASE_COUNT_ELEMENTS_IN_ORDER,
  SORT_INGRIDIENTS_IN_CONSTRUCTOR,
} from '../actions/products'
import { AnyAction } from 'redux';
import { menuItemProp } from '../../utils/constants';

interface iinitialState {
  currentTab: string,

  productData: menuItemProp[],
  itemsRequest: boolean,
  itemsFailed: boolean,

  bunIngridientInOrder: menuItemProp[],
  notBunIngridientsInOrder: menuItemProp[],  
}

const initialState:iinitialState = {
  currentTab: 'Булки',

  productData: [],
  itemsRequest: false,
  itemsFailed: false,

  bunIngridientInOrder: [],
  notBunIngridientsInOrder: [], 
}

export const productsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {

    case GET_ITEMS_REQUEST: {
      return {
        ...state,
        itemsRequest: true,
        itemsFailed: false
      }
    }

    case GET_ITEMS_SUCCESS: {
      return {
        ...state,
        itemsFailed: false,
        productData: action.payload.data,
        itemsRequest: false,
      }      
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true, 
        itemsRequest: false,
        items: []
      }
    }

    case ADD_DRAGGED_ELEMENTS: {
      return {
        ...state,
        bunIngridientInOrder: [...state.bunIngridientInOrder, ...state.productData.filter((element: {_id: string}) => 
          element._id === action.dataElement._id && action.dataElement.type === 'bun')],
        notBunIngridientsInOrder: [...state.notBunIngridientsInOrder, ...state.productData.filter((element: {_id: string}) => 
          element._id === action.dataElement._id && (action.dataElement.type === 'main' || action.dataElement.type === 'sauce'))],
      }
    }    
    case INCREASE_COUNT_ELEMENTS_IN_ORDER: {
      return {
        ...state,
        productData: [...state.productData].map((element: menuItemProp) =>
         element._id === action.dataElement._id ? { ...element, __v: ++element.__v } : element),        
      }
    }
    case DECREASE_COUNT_ELEMENTS_IN_ORDER: {
      return {
        ...state,
        productData: [...state.productData].map((element: menuItemProp) => 
        element._id === action.dataElement._id ? { ...element, __v: --element.__v } : element),        
      }
    }        
    case DELETE_DRAGGED_ELEMENTS: {
      return {
        ...state,
        notBunIngridientsInOrder: [...state.notBunIngridientsInOrder].filter((element) => 
        [...state.notBunIngridientsInOrder].indexOf(element) !== action.key)
      }
    }
    case DELETE_PREV_BUN_ELEMENT: {
      return {
        ...state,
        bunIngridientInOrder: [],
        productData: [...state.productData].map((element: menuItemProp) => 
        (element.type === 'bun' && element.__v > 0) ? { ...element, __v: --element.__v } : element),
      }
    }
    case SORT_INGRIDIENTS_IN_CONSTRUCTOR: {
      return {
        ...state,
        notBunIngridientsInOrder: action.newSortIndridients
      }
    }

    default: {
      return state;
    }
  }
}