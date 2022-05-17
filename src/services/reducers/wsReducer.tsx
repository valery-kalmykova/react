import {  
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ORDERS
} from '../actions/wsActions';
import { IwsActions } from '../actions/wsActions';
import { order, orderDefault } from '../../utils/constants';

interface IinitialState {
  wsConnected: boolean,
  orders: order[],
  total: number,
  totalToday: number,
  getOrdersSuccess: boolean
}

const initialState: IinitialState = {
  wsConnected: false,
  orders: [orderDefault],  
  total: 0,
  totalToday: 0,
  getOrdersSuccess: false
};

export const wsReducer = (state: IinitialState = initialState, action: IwsActions): IinitialState => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false
      };

    case WS_GET_ORDERS:
      return {
        ...state,
        getOrdersSuccess: action.payload.success,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
        orders: action.payload.orders
      };    

    default:
      return state;
  }
};