import { combineReducers } from 'redux';
import { productsReducer } from './products';
import { ingredientDetailReducer } from './ingredientDetail';
import { orderReducer } from './order'

export const rootReducer = combineReducers({
  products: productsReducer,
  ingredientDetail: ingredientDetailReducer,
  order: orderReducer,  
});