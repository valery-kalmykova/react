import {
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
  ADD_DRAGGED_ELEMENTS,
  SET_KEY_VALUE,
  DELETE_DRAGGED_ELEMENTS,
  DELETE_PREV_BUN_ELEMENT,
  INCREASE_COUNT_ELEMENTS_IN_ORDER,
  DECREASE_COUNT_ELEMENTS_IN_ORDER,
  SORT_INGRIDIENTS_IN_CONSTRUCTOR  
} from '../actions/products'
import { CLEAR_CONSTRUCTOR } from '../actions/order'
import { AnyAction } from 'redux';
import { menuItemProp, itemDefault } from '../../utils/constants';

interface iinitialState {
  currentTab: string,

  productData: menuItemProp[],
  itemsRequest: boolean,
  itemsFailed: boolean,
  response: boolean,

  bunIngridientInOrder: menuItemProp[],
  notBunIngridientsInOrder: menuItemProp[],  
}

const initialState:iinitialState = {
  currentTab: 'Булки',

  productData: [itemDefault],
  itemsRequest: false,
  itemsFailed: false,
  response: false,

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
        productData: action.payload.data.data,
        response: true,
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
        bunIngridientInOrder: [...state.bunIngridientInOrder, ...state.productData.filter((element: menuItemProp) => 
          element._id === action.dataElement._id && action.dataElement.type === 'bun')],
        notBunIngridientsInOrder: [...state.notBunIngridientsInOrder, ...state.productData.filter((element: menuItemProp) => 
          element._id === action.dataElement._id && (action.dataElement.type === 'main' || action.dataElement.type === 'sauce'))],       
      }
    }  
    case SET_KEY_VALUE: {
      return {
        ...state,
        productData: [...state.productData].map((element: menuItemProp) =>
         element._id === action.payload.dataElement._id ? { ...element, uuid: action.key } : element),        
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
        notBunIngridientsInOrder: [...state.notBunIngridientsInOrder].filter((element: menuItemProp) => 
        element.uuid !== action.dataElement.uuid)
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
    case CLEAR_CONSTRUCTOR: {
      return {
        ...state,
        notBunIngridientsInOrder: [],
        bunIngridientInOrder: [],
        productData: [...state.productData].map((element: menuItemProp) => 
        (element.__v > 0) ? { ...element, __v: 0} : element),
      }
    }

    default: {
      return state;
    }
  }
}