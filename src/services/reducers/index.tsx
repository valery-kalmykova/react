import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';
import { combineReducers } from 'redux';
import { productsReducer } from './products';
import { ingredientDetailReducer } from './ingredientDetail';
import { orderReducer } from './order'
import { userReducer } from './user'
import { passwordReducer } from './password';
import { wsReducer } from './wsReducer';
import type { IApplicationActions } from '../actions/index';

export const rootReducer = combineReducers({
  products: productsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,  
  user: userReducer,
  password: passwordReducer,
  wsReducer: wsReducer,
});

export type RootState = ReturnType<typeof rootReducer>

export type AppThunk<TReturn = void> = ActionCreator<
ThunkAction<TReturn, Action, RootState, IApplicationActions>
>; 