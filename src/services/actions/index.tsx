import type { IOrderActions } from './order';
import type { IhandleIngredientDetailActions } from './ingredientDetail';
import type { IPasswordActions } from './password';
import type { IProductsActions } from './products';
import type { IUserActions } from './user';
import type { IwsActions } from './wsActions';

export type IApplicationActions = 
| IOrderActions
| IhandleIngredientDetailActions
| IPasswordActions
| IProductsActions
| IUserActions
| IwsActions