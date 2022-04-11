import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory }from 'react-router-dom';
import Modal from './Modal';
import OrderFeedDetail from '../OrderFeedDetail/OrderFeedDetail'


const ModalWithFeedDetail = () => {
  const history = useHistory();
  const { id } = useParams();

  const closeFeedDetail = () => {    
    history.replace({pathname: '/feed'});
  };

  return (
    <Modal title='#034533' handleClose={closeFeedDetail}>        
        <OrderFeedDetail/>
    </Modal>
  )
}

export default ModalWithFeedDetail;
