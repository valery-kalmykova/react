import { baseUrl, checkResponse } from '../../utils/constants';
import { AppDispatch } from '../reducers/store';
import { userData, loginData } from '../../utils/constants';
import { AppThunk } from '../reducers/index';
import type { IApplicationActions } from './index';

export const IS_LOGGED_IN: 'IS_LOGGED_IN' = 'IS_LOGGED_IN';
export const IS_NOT_LOGGED_IN: 'IS_NOT_LOGGED_IN' = 'IS_NOT_LOGGED_IN';

export const LOGIN_USER_REQUEST: 'LOGIN_USER_REQUEST' = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS: 'LOGIN_USER_SUCCESS' = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED: 'LOGIN_USER_FAILED' = 'LOGIN_USER_FAILED';

export const REGISTER_USER_REQUEST: 'REGISTER_USER_REQUEST' = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS: 'REGISTER_USER_SUCCESS' = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED: 'REGISTER_USER_FAILED' = 'REGISTER_USER_FAILED';

export const GET_USER_REQUEST: 'GET_USER_REQUEST' = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const CHANGE_USER_REQUEST: 'CHANGE_USER_REQUEST' = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS: 'CHANGE_USER_SUCCESS' = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILED: 'CHANGE_USER_FAILED' = 'CHANGE_USER_FAILED';

export const LOGOUT_USER_REQUEST: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED: 'LOGOUT_USER_REQUEST' = 'LOGOUT_USER_REQUEST';

export const REFRESH_TOKEN_REQUEST: 'REFRESH_TOKEN_REQUEST' = 'REFRESH_TOKEN_REQUEST';
export const REFRESH_TOKEN_SUCCESS: 'REFRESH_TOKEN_SUCCESS' = 'REFRESH_TOKEN_SUCCESS';
export const REFRESH_TOKEN_FAILED: 'REFRESH_TOKEN_FAILED' = 'REFRESH_TOKEN_FAILED';

interface IsetIsLoggedIn {
  readonly type: typeof IS_LOGGED_IN;
}

interface IsetIsNotLoggedIn {
  readonly type: typeof IS_NOT_LOGGED_IN;
}

interface IloginUserRequest {
  readonly type: typeof LOGIN_USER_REQUEST;
}

interface IloginUserSuccess {
  readonly type: typeof LOGIN_USER_SUCCESS;
  readonly payload:  { data: { user: userData } }
}

interface IloginUserFailed {
  readonly type: typeof LOGIN_USER_FAILED;
  readonly payload:  { error: {} }
}

interface IregisterUserRequest {
  readonly type: typeof REGISTER_USER_REQUEST;  
}

interface IregisterUserSuccess {
  readonly type: typeof REGISTER_USER_SUCCESS;
  readonly payload:  { data: { user: userData } }
}

interface IregisterUserFailed {
  readonly type: typeof REGISTER_USER_FAILED;
  readonly payload:  { error: {} }
}

interface IgetUserRequest {
  readonly type: typeof GET_USER_REQUEST;
}

interface IgetUserSuccess {
  readonly type: typeof GET_USER_SUCCESS;
  readonly payload:  { data: { user: userData, success: boolean } }
}

interface IgetUserFailed {
  readonly type: typeof GET_USER_FAILED;
  readonly payload:  { error: {} }
}

interface IchangeUserRequest {
  readonly type: typeof CHANGE_USER_REQUEST;  
}

interface IchangeUserSuccess {
  readonly type: typeof CHANGE_USER_SUCCESS;
  readonly payload:  { data: { user: userData } }
}

interface IchangeUserFailed {
  readonly type: typeof CHANGE_USER_FAILED;
  readonly payload:  { error: {} }
}

interface IlogoutUserRequest {
  readonly type: typeof LOGOUT_USER_REQUEST; 
}

interface IlogoutUserSuccess {
  readonly type: typeof LOGOUT_USER_SUCCESS;
  readonly payload:  { data: {} }
}

interface IlogoutUserFailed {
  readonly type: typeof LOGOUT_USER_FAILED;
  readonly payload:  { error: {} }
}

interface IrefreshTokenRequest {
  readonly type: typeof REFRESH_TOKEN_REQUEST;  
}

interface IrefreshTokenSuccess {
  readonly type: typeof REFRESH_TOKEN_SUCCESS;
  readonly payload:  { success: boolean }
}

interface IrefreshTokenFailed {
  readonly type: typeof REFRESH_TOKEN_FAILED;
  readonly payload:  { error: {} }
}

export type IUserActions = 
| IsetIsLoggedIn
| IsetIsNotLoggedIn
| IloginUserRequest
| IloginUserSuccess
| IloginUserFailed
| IregisterUserRequest
| IregisterUserSuccess
| IregisterUserFailed
| IgetUserRequest
| IgetUserSuccess
| IgetUserFailed
| IchangeUserRequest
| IchangeUserSuccess
| IchangeUserFailed
| IlogoutUserRequest
| IlogoutUserSuccess
| IlogoutUserFailed 
| IrefreshTokenRequest
| IrefreshTokenSuccess
| IrefreshTokenFailed

export const setIsLoggedIn = (): IUserActions => ({
  type: IS_LOGGED_IN
})

export const setIsNotLoggedIn = (): IUserActions => ({
  type: IS_NOT_LOGGED_IN
})

export const loginUserRequest = (): IUserActions => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = ( data: { user: userData } ): IUserActions => ({
  type: LOGIN_USER_SUCCESS,
  payload: { data }
});

export const loginUserFailed = (error: {}): IUserActions => ({
  type: LOGIN_USER_FAILED,
  payload: { error }
});

export const loginUser: AppThunk<Promise<IApplicationActions>> = (userData: loginData) => (dispatch: AppDispatch) =>{
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": userData.email, 
      "password": userData.password
    })
  };
  dispatch(loginUserRequest());
  return fetch(baseUrl + '/auth/login', requestOptions)
    .then(checkResponse) 
    .then(res => {
      dispatch(loginUserSuccess(res));
      dispatch(setIsLoggedIn()); 
      localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
      localStorage.setItem('refreshToken', res.refreshToken); 
      return res;        
    })  
    .catch(error => dispatch(loginUserFailed(error)));
}

export const registerUserRequest = (): IUserActions => ({
  type: REGISTER_USER_REQUEST
});

export const registerUserSuccess = ( data: { user: userData } ): IUserActions => ({
  type: REGISTER_USER_SUCCESS,
  payload: { data }
});

export const registerUserFailed = (error: {}): IUserActions => ({
  type: REGISTER_USER_FAILED,
  payload: { error }
});

export const registerUser: AppThunk<Promise<IApplicationActions>> = (userData: userData) => (dispatch: AppDispatch) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "email": userData.email, 
      "password": userData.password, 
      "name": userData.name 
    })
  };   
  dispatch(registerUserRequest());
  return fetch(baseUrl + '/auth/register', requestOptions)
    .then(checkResponse) 
    .then(res => {
      dispatch(registerUserSuccess(res));
      dispatch(setIsLoggedIn());
      localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);          
      return res;        
    })
    .catch(error => dispatch(registerUserFailed(error)));
}

export const getUserRequest = (): IUserActions => ({
  type: GET_USER_REQUEST
});

export const getUserSuccess = (data: { user: userData, success: boolean }): IUserActions => ({
  type: GET_USER_SUCCESS,
  payload: { data }
});

export const getUserFailed = (error: {}): IUserActions => ({
  type: GET_USER_FAILED,
  payload: { error }
});

export const getUser: AppThunk<Promise<IApplicationActions>> = () => (dispatch: AppDispatch) =>{
  const accessToken = localStorage.getItem('accessToken');
  const requestOptions = {
    method: 'GET',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`
    },      
  };
  dispatch(getUserRequest());
  return fetch(baseUrl + '/auth/user', requestOptions)      
    .then(checkResponse)  
    .then(res => {
      dispatch(getUserSuccess(res));          
      return res.success;        
    }) 
    .catch(error => dispatch(getUserFailed(error)));
}

export const changeUserRequest = (): IUserActions => ({
  type:  CHANGE_USER_REQUEST
});

export const changeUserSuccess = (data: { user: userData }): IUserActions => ({
  type:  CHANGE_USER_SUCCESS,
  payload: { data }
});

export const changeUserFailed = (error: {}): IUserActions => ({
  type:  CHANGE_USER_FAILED,
  payload: { error }
});

export const changeUser: AppThunk<Promise<IApplicationActions>> = (userData: userData) => (dispatch: AppDispatch) => {
  const accessToken = localStorage.getItem('accessToken')  
  const requestOptions = {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}` 
    },
    body: JSON.stringify({
      "email": userData.email, 
      "password": userData.password === 'Новый пароль' ? null : userData.password,
      "name": userData.name 
    }) 
  };    
  dispatch(changeUserRequest());
  return fetch(baseUrl + '/auth/user', requestOptions)
    .then(checkResponse) 
    .then(res => {
      dispatch(changeUserSuccess(res));          
      return res;        
    })
    .catch(error => dispatch(changeUserFailed(error)));
}

export const logoutUserRequest = (): IUserActions => ({
  type:  LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = (data: {}): IUserActions => ({
  type:  LOGOUT_USER_SUCCESS,
  payload: { data }
});

export const logoutUserFailed = (error: {}): IUserActions => ({
  type:  LOGOUT_USER_FAILED,
  payload: { error }
});

export const logoutUser: AppThunk<Promise<IApplicationActions>> = () => (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken')
  const requestOptions = {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
      "token": refreshToken
    }) 
  };
  dispatch(logoutUserRequest());
  return fetch(baseUrl + '/auth/logout', requestOptions)
    .then(checkResponse) 
    .then(res => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      dispatch(logoutUserSuccess(res));          
      dispatch(setIsNotLoggedIn());
      return res;        
    })
    .catch(error => dispatch(logoutUserFailed(error))); 
}

export const refreshTokenRequest = (): IUserActions => ({
  type: REFRESH_TOKEN_REQUEST
})

export const refreshTokenSuccess = (success: boolean): IUserActions => ({
  type: REFRESH_TOKEN_SUCCESS,
  payload: { success }
})

export const refreshTokenFailed = (error: {}): IUserActions => ({
  type: REFRESH_TOKEN_FAILED,
  payload: { error }
})


export const refreshToken: AppThunk<Promise<IApplicationActions>> = () => (dispatch: AppDispatch) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      "token": refreshToken,       
    })
  }
  dispatch(refreshTokenRequest())
  return fetch(baseUrl + '/auth/token', requestOptions)
    .then(checkResponse) 
    .then(res => {
      dispatch(refreshTokenSuccess(res));
      dispatch(setIsLoggedIn());
      localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1]);
      localStorage.setItem('refreshToken', res.refreshToken);          
      return res;
    })
    .catch(error => dispatch(refreshTokenFailed(error)));
}