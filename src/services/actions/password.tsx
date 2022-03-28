import { baseUrl, checkResponse } from '../../utils/constants';
import { AppDispatch } from '../reducers/store';

export const FORGOT_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST = 'FORGOT_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS = 'FORGOT_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED = 'FORGOT_PASSWORD_FAILED';

export const forgotPasswordRequest = () => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = (data: []) => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: { data }
});

export const forgotPasswordFailed = (error: string) => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: { error }
});

export function forgotPassword(email: string) {
  return async (dispatch: AppDispatch) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": email,        
      })
    };
    try {
      dispatch(forgotPasswordRequest());
      return fetch(baseUrl + '/password-reset', requestOptions)
        .then(checkResponse) 
        .then(res => {          
          dispatch(forgotPasswordSuccess(res));   
          localStorage.setItem('keySendSuccess', res.success)          
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(forgotPasswordFailed(error))
      console.log(error)
    }
  };
}


export const resetPasswordRequest = () => ({
  type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = (data: []) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: { data }
});

export const resetPasswordFailed = (error: string) => ({
  type: RESET_PASSWORD_FAILED,
  payload: { error }
});

export function resetPassword(data: {password: string, secretKey: string}) {
  return async (dispatch: AppDispatch) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "password": data.password, 
        "token": data.secretKey,       
      })
    };
    try {
      dispatch(resetPasswordRequest());
      return fetch(baseUrl + '/password-reset/reset', requestOptions)
        .then(checkResponse) 
        .then(res => {
          dispatch(resetPasswordSuccess(res));
          localStorage.removeItem('keySendSuccess');
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(resetPasswordFailed(error))
      console.log(error)
    }
  };
}