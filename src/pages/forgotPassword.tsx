import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { forgotPassword } from '../services/actions/password';
import { mailformat } from '../utils/constants';

const ForgotPassword = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const emailRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState(''); 
  const [hasError, setHasError] = useState(false);
  const disabledSubmit = (email === '' || hasError)

  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  const submitHandler = async () => {  
    await dispatch(forgotPassword(email));
    history.replace({ pathname: '/reset-password', state: {from: history.location.pathname} });
  };
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <form className={styles.items}>      
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={email} 
            onChange={e => {
              setEmail(e.target.value);
              if (emailRef.current && !emailRef.current.value.match(mailformat)) {
                setHasError(true)
              } else {
                setHasError(false)
              }
            }}
            name={'login'}   
            type={'email'}
            placeholder={'Email'}              
            error={hasError}
            errorText={'Введите корректный e-mail'} 
            ref={emailRef}                             
          />
        </div>        
      </form>
      <Button type="primary" size="medium" onClick={submitHandler} disabled={disabledSubmit}>Восстановить</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вспомнили пароль?
        <Button type="secondary" size="medium" onClick={login}>Войти</Button>  
      </p>      
    </div>
  )
}

export default ForgotPassword
                                                                                                                                                                