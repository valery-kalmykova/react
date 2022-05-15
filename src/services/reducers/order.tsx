import {
  HANDLE_OPEN_ORDER,
  HANDLE_CLOSE_ORDER,
  GET_ORDER_FAILED,
  GET_ORDER_REQUEST,
  GET_ORDER_SUCCESS,  
} from '../actions/order';
import type { IOrderActions } from '../actions/order';

interface IinitialState { 
  orderNumber: number,
  isVisibleModalOrder: boolean,
  orderRequest: boolean,
  orderFailed: boolean,
}

const initialState:IinitialState = {
  orderNumber: 0,
  isVisibleModalOrder: false,
  orderRequest: false,
  orderFailed: false,
}

export const orderReducer = (state = initialState, action: IOrderActions): IinitialState => {
  switch (action.type) {
    case HANDLE_OPEN_ORDER: {
      return {
        ...state,
        orderNumber: action.payload.order,
        isVisibleModalOrder: true
      }
    }
    case HANDLE_CLOSE_ORDER: {
      return {
        ...state,
        orderNumber: 0,
        isVisibleModalOrder: false
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
        orderNumber: action.payload.order,
        orderRequest: false,
      }      
    }

    case GET_ORDER_FAILED: {
      return {
        ...state,
        orderFailed: true, 
        orderRequest: false,
        orderNumber: 0
      }
    }

    default: {
      return state;
    }
  }
}