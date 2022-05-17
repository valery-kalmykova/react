import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';
import { useParams, Redirect }from 'react-router-dom';
import OrderFeedDetail from '../components/OrderFeedDetail/OrderFeedDetail';
import { Loader } from '../ui/Loader/Loader';
import { order } from '../utils/constants';

const FeedDetail: React.FC = () => {  
  const { id } = useParams<{id?: string}>();
  const orders = useSelector(state => state.wsReducer.orders);
  const getOrdersSuccess = useSelector(state => state.wsReducer.getOrdersSuccess);
  const order = orders.find((element: order) => element._id === id);
  const wsConnected = useSelector(state => state.wsReducer.wsConnected);

  const dispatch = useDispatch(); 
  
  useEffect(
    () => {      
      dispatch({ type: WS_CONNECTION_START });          
    },
    [dispatch]
  );

  useEffect(
    () => {
      return () => {
        if(wsConnected) {          
          dispatch({ type: WS_CONNECTION_CLOSED })
        }        
      }
    }, [wsConnected, dispatch]
  )

  if (!getOrdersSuccess) {
    return <Loader size="large" inverse={true}/>
  }

  if (getOrdersSuccess && order) {
    return (
      <div className={styles.mainFeedDetail}>
        <p className={styles.mainFeedDetailNumber + " text text_type_digits-default"}>{'#'+order.number}</p>
        <OrderFeedDetail order={order}/>
      </div>
      
    )
  }
  return (<Redirect to='/404'/>)
}

export default FeedDetail;