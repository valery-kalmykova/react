import { baseUrl, checkResponse } from '../../utils/constants';
import { fetchWithAuth } from '../../utils/token';
import { AppDispatch } from '../reducers/store';
import { userData } from '../../utils/constants';

export const LOGIN_USER_REQUEST = 'LOGIN_USER_REQUEST';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILED = 'LOGIN_USER_FAILED';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILED = 'REGISTER_USER_FAILED';

export const GET_USER_REQUEST = 'GET_USER_REQUEST';
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS';
export const GET_USER_FAILED = 'GET_USER_FAILED';

export const CHANGE_USER_REQUEST = 'CHANGE_USER_REQUEST';
export const CHANGE_USER_SUCCESS = 'CHANGE_USER_SUCCESS';
export const CHANGE_USER_FAILED = 'CHANGE_USER_FAILED';

export const LOGOUT_USER_REQUEST = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_SUCCESS = 'LOGOUT_USER_REQUEST';
export const LOGOUT_USER_FAILED = 'LOGOUT_USER_REQUEST';

export const loginUserRequest = () => ({
  type: LOGIN_USER_REQUEST
});

export const loginUserSuccess = (data: []) => ({
  type: LOGIN_USER_SUCCESS,
  payload: { data }
});

export const loginUserFailed = (error: string) => ({
  type: LOGIN_USER_FAILED,
  payload: { error }
});

export function loginUser(userData: userData) {
  return async (dispatch: AppDispatch) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": userData.email, 
        "password": userData.password
      })
    };
    try {
      dispatch(loginUserRequest());
      return fetch(baseUrl + '/auth/login', requestOptions)
        .then(checkResponse) 
        .then(res => {
          dispatch(loginUserSuccess(res));
          localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
          localStorage.setItem('refreshToken', res.refreshToken);                    
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(loginUserFailed(error))
      console.log(error)
    }
  };
}

export const registerUserRequest = () => ({
  type: REGISTER_USER_REQUEST
});

export const registerUserSuccess = (data: []) => ({
  type: REGISTER_USER_SUCCESS,
  payload: { data }
});

export const registerUserFailed = (error: string) => ({
  type: REGISTER_USER_FAILED,
  payload: { error }
});

export function registerUser(userData: userData) {
  return async (dispatch: AppDispatch) => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        "email": userData.email, 
        "password": userData.password, 
        "name": userData.name 
      })
    };
    try {
      dispatch(registerUserRequest());
      return fetch(baseUrl + '/auth/register', requestOptions)
        .then(checkResponse) 
        .then(res => {
          dispatch(registerUserSuccess(res));
          localStorage.setItem('accessToken', res.accessToken.split('Bearer ')[1])
          localStorage.setItem('refreshToken', res.refreshToken)
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(registerUserFailed(error))
      console.log(error)
    }
  };
}

export const getUserRequest = () => ({
  type: GET_USER_REQUEST
});

export const getUserSuccess = (data: []) => ({
  type: GET_USER_SUCCESS,
  payload: { data }
});

export const getUserFailed = (error: string) => ({
  type: GET_USER_FAILED,
  payload: { error }
});

export function getUser() {
  return async (dispatch: AppDispatch) => {    
    const requestOptions = {
      method: 'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': ''
      },      
    };
    try {
      dispatch(getUserRequest());
      return fetchWithAuth(baseUrl + '/auth/user', requestOptions)         
        .then(checkResponse)  
        .then(res => {
          dispatch(getUserSuccess(res));   
          return res.success;        
        })        
      }    
    catch(error: any) {
      dispatch(getUserFailed(error))
      console.log(error)
    }
  };
}

export const changeUserRequest = () => ({
  type:  CHANGE_USER_REQUEST
});

export const changeUserSuccess = (data: []) => ({
  type:  CHANGE_USER_SUCCESS,
  payload: { data }
});

export const changeUserFailed = (error: string) => ({
  type:  CHANGE_USER_FAILED,
  payload: { error }
});

export function changeUser(userData: userData) {
  return async (dispatch: AppDispatch) => {    
    const requestOptions = {
      method: 'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': ''
      },
      body: JSON.stringify({
        "email": userData.email, 
        "password": userData.password,
        "name": userData.name 
      }) 
    };
    try {
      dispatch(changeUserRequest());
      return fetchWithAuth(baseUrl + '/auth/user', requestOptions)
        .then(checkResponse) 
        .then(res => {
          dispatch(changeUserSuccess(res));          
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(changeUserFailed(error))
      console.log(error)
    }
  };
}

export const logoutUserRequest = () => ({
  type:  LOGOUT_USER_REQUEST
});

export const logoutUserSuccess = (data: []) => ({
  type:  LOGOUT_USER_SUCCESS,
  payload: { data }
});

export const logoutUserFailed = (error: string) => ({
  type:  LOGOUT_USER_FAILED,
  payload: { error }
});

export function logoutUser() {
  return async (dispatch: AppDispatch) => {    
    const refreshToken = localStorage.getItem('refreshToken')
    const requestOptions = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        "token": refreshToken
      }) 
    };
    try {
      dispatch(logoutUserRequest());
      return fetch(baseUrl + '/auth/logout', requestOptions)
        .then(checkResponse) 
        .then(res => {
          dispatch(logoutUserSuccess(res));
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');              
          return res;        
        })        
      }    
    catch(error: any) {
      dispatch(logoutUserFailed(error))
      console.log(error)
    }
  };
}