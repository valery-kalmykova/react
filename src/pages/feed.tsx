import React, { useEffect } from 'react';
import styles from './pages.module.css';
import { useDispatch } from 'react-redux';
import OrderFeed from '../components/OrderFeed/OrderFeed';
import OrderFeedTotals from '../components/OrderFeedTotals/OrderFeedTotals';
import { WS_CONNECTION_START } from '../services/actions/wsActions';

const Feed = () => {
  const dispatch = useDispatch(); 
  
  useEffect(
    () => {      
      dispatch({ type: WS_CONNECTION_START });          
    },
    [dispatch]
  );

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