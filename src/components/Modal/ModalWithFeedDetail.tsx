import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory, useLocation }from 'react-router-dom';
import Modal from './Modal';
import OrderFeedDetail from '../OrderFeedDetail/OrderFeedDetail';
import { RootState } from '../../services/reducers';
import { order } from '../../utils/constants';

const ModalWithFeedDetail = () => {
  const history = useHistory();
  const location = useLocation();  
  const backgroundPath = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
  const { id } = useParams();
  const orders = useSelector((state:RootState) => state.wsReducer.orders);
  const order = orders.find((element: order) => element._id === id);

  const closeFeedDetail = () => {    
    history.replace({pathname: backgroundPath});
  };

  return (
    <Modal title={order.number} handleClose={closeFeedDetail}>        
        <OrderFeedDetail order={order}/>
    </Modal>
  )
}

export default ModalWithFeedDetail;
