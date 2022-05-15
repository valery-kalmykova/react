import { baseUrl, checkResponse } from '../../utils/constants';
import { AppDispatch } from '../reducers/store';
import { AppThunk } from '../reducers/index';
import type { IApplicationActions } from './index';

export const FORGOT_PASSWORD_REQUEST: 'FORGOT_PASSWORD_REQUEST' = 'FORGOT_PASSWORD_REQUEST';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_FAILED: 'FORGOT_PASSWORD_FAILED' = 'FORGOT_PASSWORD_FAILED';

export const RESET_PASSWORD_REQUEST: 'RESET_PASSWORD_REQUEST' = 'RESET_PASSWORD_REQUEST';
export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const RESET_PASSWORD_FAILED: 'RESET_PASSWORD_FAILED' = 'RESET_PASSWORD_FAILED';

interface IforgotPasswordRequest {
  readonly type: typeof FORGOT_PASSWORD_REQUEST
}

interface IforgotPasswordSuccess {
  readonly type: typeof FORGOT_PASSWORD_SUCCESS;
  readonly payload:  { data: {} }
}

interface IforgotPasswordFailed {
  readonly type: typeof FORGOT_PASSWORD_FAILED;
  readonly payload:  { error: {} }
}

interface IresetPasswordRequest {
  readonly type: typeof RESET_PASSWORD_REQUEST
}

interface IresetPasswordSuccess {
  readonly type: typeof RESET_PASSWORD_SUCCESS;
  readonly payload:  { data: {} }
}

interface IresetPasswordFailed {
  readonly type: typeof RESET_PASSWORD_FAILED;
  readonly payload:  { error: {} }
}

export type IPasswordActions =
| IforgotPasswordRequest
| IforgotPasswordSuccess
| IforgotPasswordFailed
| IresetPasswordRequest
| IresetPasswordSuccess
| IresetPasswordFailed

export const forgotPasswordRequest = (): IPasswordActions => ({
  type: FORGOT_PASSWORD_REQUEST
});

export const forgotPasswordSuccess = (data: {}): IPasswordActions => ({
  type: FORGOT_PASSWORD_SUCCESS,
  payload: { data }
});

export const forgotPasswordFailed = (error: {}): IPasswordActions => ({
  type: FORGOT_PASSWORD_FAILED,
  payload: { error }
});

export const forgotPassword: AppThunk<Promise<IApplicationActions>> = (email: String) => (dispatch: AppDispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": email,        
    })
  };  
  dispatch(forgotPasswordRequest());
  return fetch(baseUrl + '/password-reset', requestOptions)
    .then(checkResponse) 
    .then(res => {          
      dispatch(forgotPasswordSuccess(res));   
      localStorage.setItem('keySendSuccess', res.success)          
      return res;        
    })
    .catch(error => dispatch(forgotPasswordFailed(error)));  
}


export const resetPasswordRequest = (): IPasswordActions => ({
  type: RESET_PASSWORD_REQUEST
});

export const resetPasswordSuccess = (data: {}): IPasswordActions => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: { data }
});

export const resetPasswordFailed = (error: {}): IPasswordActions => ({
  type: RESET_PASSWORD_FAILED,
  payload: { error }
});

export const resetPassword: AppThunk<Promise<IApplicationActions>> = (data: {password: string, secretKey: string}) => (dispatch: AppDispatch) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "password": data.password, 
      "token": data.secretKey,       
    })
  };  
  dispatch(resetPasswordRequest());
  return fetch(baseUrl + '/password-reset/reset', requestOptions)
    .then(checkResponse) 
    .then(res => {
      dispatch(resetPasswordSuccess(res));
      localStorage.removeItem('keySendSuccess');
      return res;        
    })        
    .catch(error => dispatch(resetPasswordFailed(error)));    
}