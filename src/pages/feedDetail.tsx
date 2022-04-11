import React from 'react';
import styles from './pages.module.css';
import OrderFeedDetail from '../components/OrderFeedDetail/OrderFeedDetail';

const FeedDetail = () => {
  return (
    <div className={styles.mainFeedDetail}>
      <p className={styles.mainFeedDetailNumber + " text text_type_digits-default"}>#034533</p>
      <OrderFeedDetail/>
    </div>
    
  )
}

export default FeedDetail;