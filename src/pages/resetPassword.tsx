import React, { useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'
import { resetPassword } from '../services/actions/password';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [passwordShow, setPasswordShow] = useState(false);

  const onIconClick = () => {
    setPasswordShow(!passwordShow)
  }
  
  const history = useHistory();

  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  const dispatch = useDispatch();
  const submitHandler = async () => {  
    await dispatch(resetPassword({password, secretKey}));
    history.replace({ pathname: '/login' });
  };
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <ul className={styles.items}>      
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            name={'password'}   
            type={passwordShow ? 'text': 'password'}
            placeholder={'Введите новый пароль'}
            icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onIconClick}              
          />
        </li>     
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={secretKey} 
            onChange={e => setSecretKey(e.target.value)}
            name={'secretKey'}   
            type={'text'}
            placeholder={'Введите код из письма'}               
          />
        </li>   
      </ul>
      <Button type="primary" size="medium" onClick={submitHandler}>Сохранить</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вспомнили пароль?          
          <Button type="secondary" size="medium" onClick={login}>Войти</Button>          
      </p>      
    </div>
  )
}

export default ResetPassword
