import {
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILED,  
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILED, 
} from '../actions/password';
import { AnyAction } from 'redux';

interface iinitialState { 
  forgotPasswordRequest: boolean,
  forgotPasswordFailed: boolean,
  resetPasswordRequest: boolean,
  resetPasswordFailed: boolean,
}

const initialState:iinitialState = { 
  forgotPasswordRequest: false,
  forgotPasswordFailed: false,
  resetPasswordRequest: false,
  resetPasswordFailed: false,
}

export const userReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case FORGOT_PASSWORD_REQUEST: {
      return {
        ...state,
        forgotPasswordRequest: true,
        forgotPasswordFailed: false
      }
    }
    case FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        forgotPasswordFailed: false,        
        forgotPasswordRequest: false,
      }      
    }
    case FORGOT_PASSWORD_FAILED: {
      return {
        ...state,
        forgotPasswordFailed: true, 
        forgotPasswordRequest: false,        
      }
    }
    
    case RESET_PASSWORD_REQUEST: {
      return {
        ...state,
        resetPasswordRequest: true,
        resetPasswordFailed: false
      }
    }
    case RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        resetPasswordFailed: false,        
        resetPasswordRequest: false,
      }      
    }
    case RESET_PASSWORD_FAILED: {
      return {
        ...state,
        resetPasswordFailed: true, 
        resetPasswordRequest: false,        
      }
    }
    
    default: {
      return state;
    }
  }
}