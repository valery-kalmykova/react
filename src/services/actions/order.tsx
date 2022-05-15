import { AppDispatch } from '../reducers/store'
import { baseUrl, checkResponse } from '../../utils/constants';
import { AppThunk } from '../reducers/index';
import type { IApplicationActions } from './index';

export const GET_ORDER_REQUEST: 'GET_ORDER_REQUEST' = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS' = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED: 'GET_ORDER_FAILED' = 'GET_ORDER_FAILED';

export const HANDLE_OPEN_ORDER: 'HANDLE_OPEN_ORDER' = 'HANDLE_OPEN_ORDER';
export const HANDLE_CLOSE_ORDER: 'HANDLE_CLOSE_ORDER' = 'HANDLE_CLOSE_ORDER';

export const CLEAR_CONSTRUCTOR: 'CLEAR_CONSTRUCTOR' = 'CLEAR_CONSTRUCTOR';

interface IfetchOrderRequest {
  readonly type: typeof GET_ORDER_REQUEST;
}

interface IfetchOrderSuccess {
  readonly type: typeof GET_ORDER_SUCCESS;
  readonly payload: { order: number }
}

interface IfetchOrderFailed {
  readonly type: typeof GET_ORDER_FAILED;
  readonly payload: { error: {} }
}

interface IhandleOpenOrder {
  readonly type: typeof HANDLE_OPEN_ORDER;
  readonly payload: { order: number }
}

interface IhandleCloseOrder {
  readonly type: typeof HANDLE_CLOSE_ORDER;
}

export interface IclearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export type IOrderActions =
| IfetchOrderRequest
| IfetchOrderSuccess
| IfetchOrderFailed
| IhandleOpenOrder
| IhandleCloseOrder
| IclearConstructor

export const fetchOrderRequest = (): IOrderActions => ({
  type: GET_ORDER_REQUEST
});

export const fetchOrderSuccess = (order: number): IOrderActions => ({
  type: GET_ORDER_SUCCESS,
  payload: { order }
});

export const fetchOrderFailed = (error: {}): IOrderActions => ({
  type: GET_ORDER_FAILED,
  payload: { error }
});

export const handleOpenOrder = (order: number): IOrderActions => ({
  type: HANDLE_OPEN_ORDER,
  payload: { order }
});

export const handleCloseOrder = (): IOrderActions => ({
  type: HANDLE_CLOSE_ORDER  
});

export const clearConstructor = (): IOrderActions => ({
  type: CLEAR_CONSTRUCTOR  
});


export const getOrderNumber: AppThunk<Promise<IApplicationActions>> = (idInOrder: String[]) => (dispatch: AppDispatch) => {
  const accessToken = localStorage.getItem('accessToken')
  const requestOptions = {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
      },
    body: JSON.stringify({ "ingredients": idInOrder }) 
  };  
  dispatch(fetchOrderRequest());
  return fetch(baseUrl + '/orders', requestOptions)
    .then(checkResponse) 
    .then(json => {
      dispatch(fetchOrderSuccess(json.order.number));  
      dispatch(clearConstructor());                         
      return json.order.number;        
    })        
    .catch(error => dispatch(fetchOrderFailed(error)));    
}