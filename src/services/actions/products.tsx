
import { urlData } from '../../utils/constants'
import { AppDispatch } from '../../index'

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const ADD_DRAGGED_ELEMENTS = 'ADD_DRAGGED_ELEMENTS';
export const INCREASE_COUNT_ELEMENTS_IN_ORDER = 'INCREASE_COUNT_ELEMENTS_IN_ORDER';
export const DECREASE_COUNT_ELEMENTS_IN_ORDER = 'DECREASE_COUNT_ELEMENTS_IN_ORDER';
export const DELETE_DRAGGED_ELEMENTS = 'DELETE_DRAGGED_ELEMENTS';
export const DELETE_PREV_BUN_ELEMENT = 'DELETE_PREV_BUN_ELEMENT';

export const SORT_INGRIDIENTS_IN_CONSTRUCTOR = 'SORT_INGRIDIENTS_IN_CONSTRUCTOR';

export const fetchProductsRequest = () => ({
  type: GET_ITEMS_REQUEST
});

export const fetchProductsSuccess = (data: []) => ({
  type: GET_ITEMS_SUCCESS,
  payload: { data }
});

export const fetchProductsFailed = (error: string) => ({
  type: GET_ITEMS_FAILED,
  payload: { error }
});

export function getItems() {  
  return (dispatch: AppDispatch) => {
    dispatch(fetchProductsRequest());
    return fetch(urlData)
      .then(res => {
        if (!res.ok) {
          throw Error(res.statusText);
        }
        return res;
        }        
      )    
      .then(res => res.json())
      .then(json => {
        dispatch(fetchProductsSuccess(json.data));              
        return json.data;       
      })
      .catch(error => dispatch(fetchProductsFailed(error)));
  };
}
