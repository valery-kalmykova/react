
import { baseUrl, checkResponse, menuItemProp } from '../../utils/constants';
import { AppDispatch } from '../reducers/store';
import { v4 as uuidv4 } from 'uuid';
import type { IclearConstructor } from './order';
import { AppThunk } from '../reducers/index';
import type { IApplicationActions } from './index';

export const GET_ITEMS_REQUEST: 'GET_ITEMS_REQUEST' = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS: 'GET_ITEMS_SUCCESS' = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED: 'GET_ITEMS_FAILED' = 'GET_ITEMS_FAILED';

export const ADD_DRAGGED_ELEMENTS: 'ADD_DRAGGED_ELEMENTS' = 'ADD_DRAGGED_ELEMENTS';
export const SET_KEY_VALUE: 'SET_KEY_VALUE' = 'SET_KEY_VALUE';
export const INCREASE_COUNT_ELEMENTS_IN_ORDER: 'INCREASE_COUNT_ELEMENTS_IN_ORDER' = 'INCREASE_COUNT_ELEMENTS_IN_ORDER';
export const DECREASE_COUNT_ELEMENTS_IN_ORDER: 'DECREASE_COUNT_ELEMENTS_IN_ORDER' = 'DECREASE_COUNT_ELEMENTS_IN_ORDER';
export const DELETE_DRAGGED_ELEMENTS: 'DELETE_DRAGGED_ELEMENTS' = 'DELETE_DRAGGED_ELEMENTS';
export const DELETE_PREV_BUN_ELEMENT: 'DELETE_PREV_BUN_ELEMENT' = 'DELETE_PREV_BUN_ELEMENT';

export const SORT_INGRIDIENTS_IN_CONSTRUCTOR: 'SORT_INGRIDIENTS_IN_CONSTRUCTOR' = 'SORT_INGRIDIENTS_IN_CONSTRUCTOR';

interface IfetchProductsRequest {
  readonly type: typeof GET_ITEMS_REQUEST
}

interface IfetchProductsSuccess {
  readonly type: typeof GET_ITEMS_SUCCESS;
  readonly payload:  { data: {data: []} }
}

interface IfetchProductsFailed {
  readonly type: typeof GET_ITEMS_FAILED;
  readonly payload:  { error: {} }
}

interface IsetKeyValue {
  readonly type: typeof SET_KEY_VALUE;
  readonly payload:  { dataElement: menuItemProp };
  readonly key: string;
}

interface IaddDraggedElements {
  readonly type: typeof ADD_DRAGGED_ELEMENTS;
  readonly payload: { dataElement: menuItemProp }
}

interface IIncreaseCountElements {
  readonly type: typeof INCREASE_COUNT_ELEMENTS_IN_ORDER;
  readonly payload: { dataElement: menuItemProp }
}

interface IDecreaseCountElements {
  readonly type: typeof DECREASE_COUNT_ELEMENTS_IN_ORDER;
  readonly payload: { dataElement: menuItemProp }
}

interface IDeleteDraggedElements {
  readonly type: typeof DELETE_DRAGGED_ELEMENTS;
  readonly payload: { dataElement: menuItemProp }
}

interface IDeletePrevBunElement {
  readonly type: typeof DELETE_PREV_BUN_ELEMENT
}

interface ISortIngridientsInConstructor {
  readonly type: typeof SORT_INGRIDIENTS_IN_CONSTRUCTOR;
  readonly payload: { newSortIndridients: [] }
}

export type IProductsActions = 
| IfetchProductsRequest
| IfetchProductsSuccess
| IfetchProductsFailed
| IsetKeyValue
| IaddDraggedElements
| IIncreaseCountElements
| IDecreaseCountElements
| IDeleteDraggedElements
| IDeletePrevBunElement
| ISortIngridientsInConstructor
| IclearConstructor

export const fetchProductsRequest = (): IProductsActions => ({
  type: GET_ITEMS_REQUEST
});

export const fetchProductsSuccess = (data: {data: []}): IProductsActions => ({
  type: GET_ITEMS_SUCCESS,
  payload: { data }
});

export const fetchProductsFailed = (error: {}): IProductsActions => ({
  type: GET_ITEMS_FAILED,
  payload: { error }
});

export const setKeyValue = (dataElement: menuItemProp): IProductsActions => ({
  type: SET_KEY_VALUE,
  payload: { dataElement },
  key: uuidv4()
})

export const addDraggedElement = (dataElement: menuItemProp): IProductsActions => ({
  type: ADD_DRAGGED_ELEMENTS,
  payload: { dataElement },
})

export const increaseCountElement = (dataElement: menuItemProp): IProductsActions => ({
  type: INCREASE_COUNT_ELEMENTS_IN_ORDER,
  payload: { dataElement },
})

export const getItems: AppThunk<Promise<IApplicationActions>> = () => (dispatch: AppDispatch) => {
  dispatch(fetchProductsRequest());
    return fetch(baseUrl + '/ingredients')
      .then(checkResponse)
      .then(json => {
        dispatch(fetchProductsSuccess(json));        
        return json;       
      })
      .catch(error => dispatch(fetchProductsFailed(error)));
}