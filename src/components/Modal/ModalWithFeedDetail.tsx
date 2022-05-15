import React from 'react';
import { useSelector } from 'react-redux';
import { useParams, useHistory, useLocation, Redirect }from 'react-router-dom';
import Modal from './Modal';
import OrderFeedDetail from '../OrderFeedDetail/OrderFeedDetail';
import { RootState } from '../../services/reducers';
import { order } from '../../utils/constants';

const ModalWithFeedDetail = () => {
  const history = useHistory();
  const location = useLocation();  
  const backgroundPath = location.pathname.slice(0, location.pathname.lastIndexOf('/'));
  const { id } = useParams<{id?: string}>();
  const orders = useSelector((state:RootState) => state.wsReducer.orders);
  const order = orders.find((element: order) => element._id === id);

  const closeFeedDetail = () => {    
    history.replace({pathname: backgroundPath});
  };
  if (order) {
    return (
      <Modal title={order.number} handleClose={closeFeedDetail}>        
          <OrderFeedDetail order={order}/>
      </Modal>
    )
  } 
  return (<Redirect to='/404'/>)
}

export default ModalWithFeedDetail;
