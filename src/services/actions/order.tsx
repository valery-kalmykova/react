import { AppDispatch } from '../../index'
import { urlOrder } from '../../utils/constants'

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';

export const HANDLE_OPEN_ORDER = 'HANDLE_OPEN_ORDER';
export const HANDLE_CLOSE_ORDER = 'HANDLE_CLOSE_ORDER';

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

export function getOrderNumber(idInOrder: String[]) {
  return async (dispatch: AppDispatch) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ "ingredients": idInOrder })
    };
    try {
      dispatch(fetchOrderRequest());
      return fetch(urlOrder, requestOptions)
        .then(res => {
          if (!res.ok) {
            throw Error(res.statusText);
          }
          return res;
          }        
        )    
        .then(res => res.json())
        .then(json => {
          dispatch(fetchOrderSuccess(json.order.number));          
          return json.order.number;
        })
      }    
    catch(error: any) {
      dispatch(fetchOrderFailed(error))
      console.log(error)
    }
  };
}