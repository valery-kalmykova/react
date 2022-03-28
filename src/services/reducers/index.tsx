import { combineReducers } from 'redux';
import { productsReducer } from './products';
import { ingredientDetailReducer } from './ingredientDetail';
import { orderReducer } from './order'
import { userReducer } from './user'
import { passwordReducer } from './password'

export const rootReducer = combineReducers({
  products: productsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,  
  user: userReducer,
  password: passwordReducer,
});

export type RootState = ReturnType<typeof rootReducer>