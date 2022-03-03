
import { url } from '../../utils/constants'
import { AppDispatch } from '../../index'

export const TAB_SWITCH = 'TAB_SWITCH';

export const GET_ITEMS_REQUEST = 'GET_ITEMS_REQUEST';
export const GET_ITEMS_SUCCESS = 'GET_ITEMS_SUCCESS';
export const GET_ITEMS_FAILED = 'GET_ITEMS_FAILED';

export function getItems() {
  return function(dispatch: AppDispatch) {
    dispatch({
      type: GET_ITEMS_REQUEST
    });
    fetch(url).then(res => {
      if (res && res.ok) {
        dispatch({
          type: GET_ITEMS_SUCCESS,
          items: res.json()
        });
        console.log(res)
      } else {
        dispatch({
          type: GET_ITEMS_FAILED
        });
      }
    }).catch( err => {
      dispatch({
          type: GET_ITEMS_FAILED
      })
    })
  };
}