import {
  HANDLE_OPEN_ORDER,
  HANDLE_CLOSE_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,
} from '../actions/order';
import { AnyAction } from 'redux';

interface iinitialState { 
  order: number,
  isVisibleModal: boolean,
  orderRequest: boolean,
  orderFailed: boolean,
}

const initialState:iinitialState = {
  order: 0,
  isVisibleModal: false,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case HANDLE_OPEN_ORDER: {
      return {
        ...state,
        order: action.payload.order,
        isVisibleModal: true
      }
    }
    case HANDLE_CLOSE_ORDER: {
      return {
        ...state,
        order: 0,
        isVisibleModal: false
      }
    }

    case GET_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
        orderFailed: false
      }
    }

    case GET_ORDER_SUCCESS: {
      return {
        ...state,
        orderFailed: false,
        order: action.payload.order,
        orderRequest: false,
      }      
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true, 
        orderRequest: false,
        order: 0
      }
    }

    default: {
      return state;
    }
  }
}