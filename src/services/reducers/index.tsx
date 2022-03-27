import { combineReducers } from 'redux';
import { productsReducer } from './products';
import { ingredientDetailReducer } from './ingredientDetail';
import { orderReducer } from './order'
import { userReducer } from './user'

export const rootReducer = combineReducers({
  products: productsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,  
  user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>