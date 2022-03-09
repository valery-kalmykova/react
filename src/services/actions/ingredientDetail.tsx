import { menuItemProp } from '../../utils/constants'

export const HANDLE_OPEN_iNGREDIENT_DETAIL = 'HANDLE_OPEN_iNGREDIENT_DETAIL';
export const HANDLE_CLOSE_iNGREDIENT_DETAIL = 'HANDLE_CLOSE_iNGREDIENT_DETAIL';

export const handleOpenIngredientDetail = (item: menuItemProp) => ({
  type: HANDLE_OPEN_iNGREDIENT_DETAIL,
  payload: { item }  
});

export const handleCloseIngredientDetail = () => ({
  type: HANDLE_CLOSE_iNGREDIENT_DETAIL  
});