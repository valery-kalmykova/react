
import { baseUrl, checkResponse, menuItemProp } from '../../utils/constants';
import { AppDispatch } from '../reducers/store';
import { v4 as uuidv4 } from 'uuid';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export const ADD_DRAGGED_ELEMENTS = 'ADD_DRAGGED_ELEMENTS';
export const SET_KEY_VALUE = 'SET_KEY_VALUE';
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

export const setKeyValue = (dataElement: menuItemProp) => ({
  type: SET_KEY_VALUE,
  payload: { dataElement },
  key: uuidv4()
})

export function getItems() {  
  return (dispatch: AppDispatch) => {
    dispatch(fetchProductsRequest());
    return fetch(baseUrl + '/ingredients')
      .then(checkResponse)
      .then(json => {
        dispatch(fetchProductsSuccess(json.data));              
        return json.data;       
      })
      .catch(error => dispatch(fetchProductsFailed(error)));
  };
}