import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory, Redirect }from 'react-router-dom';
import Modal from './Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { RootState } from '../../services/reducers';
import {menuItemProp} from '../../utils/constants';

const ModalWithIngridientDetail = () => {
  const history = useHistory();
  const { id } = useParams<{id?: string}>();
  const productData = useSelector((state:RootState) => state.products.productData);  
  const item = productData.find((element: menuItemProp) => element._id === id);

  const closeIngredientDetail = () => {    
    history.replace({pathname: '/'});
  };
  if (item) {
    return (
      <Modal title='Детали ингредиента' handleClose={closeIngredientDetail}>        
          <IngredientDetails item={item}/>
      </Modal>
    )
  }
  return (<Redirect to='/404'/>)
}

export default ModalWithIngridientDetail;
