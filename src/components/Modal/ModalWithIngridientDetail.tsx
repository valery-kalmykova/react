import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory }from 'react-router-dom';
import Modal from './Modal';
import IngredientDetails from '../IngredientDetails/IngredientDetails';
import { RootState } from '../../services/reducers';

const ModalWithIngridientDetail = () => {
  const history = useHistory();
  const { id } = useParams();
  const productData = useSelector((state:RootState) => state.products.productData);  
  const item = productData.find(element => element._id === id);

  const closeIngredientDetail = () => {    
    history.replace({pathname: '/'});
  };

  return (
    <Modal title='Детали ингредиента' handleClose={closeIngredientDetail}>        
        <IngredientDetails item={item}/>
    </Modal>
  )
}

export default ModalWithIngridientDetail;
