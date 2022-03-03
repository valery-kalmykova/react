import {
  TAB_SWITCH,
  GET_ITEMS_FAILED,
  GET_ITEMS_REQUEST,
  GET_ITEMS_SUCCESS,
} from '../actions/products'
import { AnyAction } from 'redux'

interface iinitialState {
  currentTab: string,

  productData: [],
  itemsRequest: boolean,
  itemsFailed: boolean,
}

const initialState:iinitialState = {
  currentTab: 'Булки',

  productData: [],
  itemsRequest: false,
  itemsFailed: false,
}

export const productsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case TAB_SWITCH: {
      return {
        state
      }
    }

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
        productData: action.items,
        itemsRequest: false,
      }      
    }

    case GET_ITEMS_FAILED: {
      return {
        ...state,
        itemsFailed: true, 
        itemsRequest: false
      }
    }
    default: {
      return state;
    }
  }
}