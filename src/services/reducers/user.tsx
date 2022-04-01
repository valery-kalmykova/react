import {
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILED,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_FAILED,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_FAILED,
  CHANGE_USER_REQUEST,
  CHANGE_USER_SUCCESS,
  CHANGE_USER_FAILED,
  LOGOUT_USER_REQUEST,
  LOGOUT_USER_SUCCESS,
  LOGOUT_USER_FAILED,   
  IS_LOGGED_IN,
  IS_NOT_LOGGED_IN,
  REFRESH_TOKEN_REQUEST,
  REFRESH_TOKEN_SUCCESS,
  REFRESH_TOKEN_FAILED, 
} from '../actions/user';
import { AnyAction } from 'redux';
import { userData, userDefault } from '../../utils/constants';

interface iinitialState { 
  user: userData,
  getUserSuccess: boolean,
  loginRequest: boolean,
  loginFailed: boolean,
  registerRequest: boolean,
  registerFailed: boolean,
  getRequest: boolean,
  getFailed: boolean,
  changeRequest: boolean,
  changeFailed: boolean,
  logoutRequest: boolean,
  logoutFailed: boolean,
  logoutSuccess: boolean,
  isLoggedIn: boolean,
  refreshRequest: boolean,
  refreshFailed: boolean,
  refreshSuccess: boolean,
}

const initialState:iinitialState = {
  user: userDefault,
  getUserSuccess: false,
  loginRequest: false,
  loginFailed: false,
  registerRequest: false,
  registerFailed: false,
  getRequest: false,
  getFailed: false,
  changeRequest: false,
  changeFailed: false,
  logoutRequest: false,
  logoutFailed: false,
  logoutSuccess: false,
  isLoggedIn: false,
  refreshRequest: false,
  refreshFailed: false,
  refreshSuccess: false,
}

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST: {
      return {
        ...state,
        loginRequest: true,
        loginFailed: false
      }
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loginFailed: false,
        user: action.payload.data.user,
        loginRequest: false,
      }      
    }
    case LOGIN_USER_FAILED: {
      return {
        ...state,
        loginFailed: true, 
        loginRequest: false,
        user: null
      }
    }

    case REGISTER_USER_REQUEST: {
      return {
        ...state,
        registerRequest: true,
        registerFailed: false
      }
    }
    case REGISTER_USER_SUCCESS: {
      return {
        ...state,
        registerFailed: false,
        user: action.payload.data.user,
        registerRequest: false,
      }      
    }
    case REGISTER_USER_FAILED: {
      return {
        ...state,
        registerFailed: true, 
        registerRequest: false,
        user: null
      }
    }

    case GET_USER_REQUEST: {
      return {
        ...state,
        getRequest: true,
        getFailed: false
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        getFailed: false,
        user: action.payload.data.user,
        getUserSuccess: action.payload.data.success,
        getRequest: false,
      }      
    }
    case GET_USER_FAILED: {
      return {
        ...state,
        getFailed: true, 
        getRequest: false,
        user: null
      }
    }

    case CHANGE_USER_REQUEST: {
      return {
        ...state,
        changeRequest: true,
        changeFailed: false
      }
    }
    case CHANGE_USER_SUCCESS: {
      return {
        ...state,
        changeFailed: false,
        user: action.payload.data.user,
        changeRequest: false,
      }      
    }
    case CHANGE_USER_FAILED: {
      return {
        ...state,
        changeFailed: true, 
        changeRequest: false        
      }
    }

    case LOGOUT_USER_REQUEST: {
      return {
        ...state,
        logoutRequest: true,
        logoutFailed: false
      }
    }
    case LOGOUT_USER_SUCCESS: {
      return {
        ...state,
        logoutFailed: false,
        user: userDefault,
        logoutRequest: false,
        logoutSuccess: true,
      }      
    }
    case LOGOUT_USER_FAILED: {
      return {
        ...state,
        logoutFailed: true, 
        logoutRequest: false        
      }
    }

    case IS_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: true              
      }
    }

    case IS_NOT_LOGGED_IN: {
      return {
        ...state,
        isLoggedIn: false              
      }
    }

    case REFRESH_TOKEN_REQUEST: {
      return {
        ...state,
        refreshRequest: true,
        refreshFailed: false
      }
    }
    case REFRESH_TOKEN_SUCCESS: {
      return {
        ...state,
        refreshFailed: false,        
        refreshRequest: false,
        refreshSuccess: action.payload.success,
      }      
    }
    case REFRESH_TOKEN_FAILED: {
      return {
        ...state,
        refreshFailed: true, 
        refreshRequest: false        
      }
    }

    default: {
      return state;
    }
  }
}