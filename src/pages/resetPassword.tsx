import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './pages.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { resetPassword } from '../services/actions/password';

const ResetPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [hasError, setHasError] = useState(false);
  const [passwordShow, setPasswordShow] = useState(false);
  const passwordRef = useRef<HTMLInputElement>(null); 
  const disabledSubmit = (secretKey === '' || 
    password === '' ||
    hasError
  )
  
  const onIconClick = () => {
    setPasswordShow(!passwordShow)
  }

  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );
  
  const submitHandler = async (e) => { 
    e.preventDefault();
    if (disabledSubmit) return  
    await dispatch(resetPassword({password, secretKey}));
    history.replace({ pathname: '/login' });
  };  
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.items} onSubmit={submitHandler}>      
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={password} 
            onChange={e => {
              setPassword(e.target.value);
              if (passwordRef.current && passwordRef.current.value.length < 5) {
                setHasError(true)                
              } else {
                setHasError(false)
              }
            }}
            name={'password'}   
            type={passwordShow ? 'text': 'password'}
            placeholder={'Введите новый пароль'}            
            error={hasError}
            errorText={'Пароль должен содержать не менее 5 символов'}
            ref={passwordRef}
            icon={passwordShow ? 'HideIcon' : 'ShowIcon'}
            onIconClick={onIconClick}
          />
        </div>     
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={secretKey} 
            onChange={e => setSecretKey(e.target.value)}
            name={'secretKey'}   
            type={'text'}
            placeholder={'Введите код из письма'}               
          />
        </div>
        <input type="submit" style={{display: 'none'}} />   
      </form>
      <Button type="primary" size="medium" onClick={submitHandler} disabled={disabledSubmit}>Сохранить</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вспомнили пароль?          
          <Button type="secondary" size="medium" onClick={login}>Войти</Button>          
      </p>      
    </div>
  )
}

export default ResetPassword
