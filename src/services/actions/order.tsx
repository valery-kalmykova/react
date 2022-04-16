import { AppDispatch } from '../reducers/store'
import { baseUrl, checkResponse } from '../../utils/constants'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const HANDLE_OPEN_ORDER = 'HANDLE_OPEN_ORDER';
export const HANDLE_CLOSE_ORDER = 'HANDLE_CLOSE_ORDER';

export const CLEAR_CONSTRUCTOR = 'CLEAR_CONSTRUCTOR';

export const fetchOrderRequest = () => ({
  type: GET_ORDER_REQUEST
});

export const fetchOrderSuccess = (order: number) => ({
  type: GET_ORDER_SUCCESS,
  payload: { order }
});

export const fetchOrderFailed = (error: string) => ({
  type: GET_ORDER_FAILED,
  payload: { error }
});

export const handleOpenOrder = (order: number) => ({
  type: HANDLE_OPEN_ORDER,
  payload: { order }
});

export const handleCloseOrder = () => ({
  type: HANDLE_CLOSE_ORDER  
});

export const clearConstructor = () => ({
  type: CLEAR_CONSTRUCTOR  
});

export function getOrderNumber(idInOrder: String[]) {
  return async (dispatch: AppDispatch) => {
    const accessToken = localStorage.getItem('accessToken')
    const requestOptions = {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`
       },
      body: JSON.stringify({ "ingredients": idInOrder }) 
    };
    try {
      dispatch(fetchOrderRequest());
      return fetch(baseUrl + '/orders', requestOptions)
        .then(checkResponse) 
        .then(json => {
          dispatch(fetchOrderSuccess(json.order.number));  
          dispatch(clearConstructor());                         
          return json.order.number;        
        })        
      }    
    catch(error: any) {
      dispatch(fetchOrderFailed(error))
      console.log(error)
    }
  };
}