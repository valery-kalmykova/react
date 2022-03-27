import React, { useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components'


const NotFound = () => {
  const history = useHistory();
  const toMain = useCallback(
    () => {
        history.replace({ pathname: '/' });
    },
    [history]
  );
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-large mb-6'>404</h2>
      <p className='text text_type_main-medium mb-6'>Упс, страница не найдена</p>      
      <Button type="secondary" size="medium" onClick={toMain}>Вернуться на главную</Button>      
    </div>
  )
}

export default NotFound
