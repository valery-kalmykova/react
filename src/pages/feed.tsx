import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch, useSelector } from '../services/hooks/hooks';
import OrderFeed from '../components/OrderFeed/OrderFeed';
import OrderFeedTotals from '../components/OrderFeedTotals/OrderFeedTotals';
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from '../services/actions/wsActions';

const Feed = () => {
  const dispatch = useDispatch();
  const wsConnected = useSelector(state => state.wsReducer.wsConnected);
  
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

  return (         
    <div className={styles.mainFeed}>
      <h2 className='text text_type_main-large mt-10 mb-5 ml-5'>Лента заказов</h2>
      <div className={styles.columnsFeed}>
        <OrderFeed path={'/feed/'}/>
        <OrderFeedTotals/>
      </div>       
    </div>  
  )
}

export default Feed;