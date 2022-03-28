import React, { useState, useCallback, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../services/actions/user';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import { mailformat } from '../utils/constants';

const Register = () => { 
  const dispatch = useDispatch(); 
  const history = useHistory();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null); 
  const [userData, setUserData] = useState({
    email: '',
    password: '',
    name: '',
  })
  const [hasError, setHasError] = useState({
    name: false,
    email: false,
    password: false 
  });
  const disabledSubmit = (userData.email === '' || 
    userData.password === '' || 
    userData.name === '' ||
    hasError.email || 
    hasError.password ||
    hasError.name
  )
  
  const login = useCallback(
    () => {
        history.replace({ pathname: '/login' });
    },
    [history]
  );

  const submitHandler = async () => {  
    await dispatch(registerUser(userData));
    history.replace({ pathname: '/' });
  };

  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Регистрация</h2>
      <form className={styles.items}>
        <div className={styles.item + ' mb-6'}>          
          <Input 
            value={userData.name}              
            onChange={e =>setUserData({...userData, name: e.target.value})}
            name={'name'}   
            type={'text'}              
            placeholder={'Имя'}              
            error={hasError.name}
            errorText={'Ошибка'}                        
          />
        </div>
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={userData.email} 
            onChange={e => {
              setUserData({...userData, email: e.target.value});
              if (emailRef.current && !emailRef.current.value.match(mailformat)) {
                setHasError({...hasError, email: true})
              } else {
                setHasError({...hasError, email: false})
              }
            }}
            name={'login'}   
            type={'email'}
            placeholder={'Email'}              
            error={hasError.email}
            errorText={'Введите корректный e-mail'} 
            ref={emailRef}                             
          />
        </div>
        <div className={styles.item + ' mb-6'}>
          <Input 
            value={userData.password} 
            onChange={e => {
              setUserData({...userData, password: e.target.value});
              if (passwordRef.current && passwordRef.current.value.length < 5) {
                setHasError({...hasError, password: true})                
              } else {
                setHasError({...hasError, password: false})
              }
            }}
            name={'password'}   
            type={'password'}
            placeholder={'Пароль'}            
            error={hasError.password}
            errorText={'Пароль должен содержать не менее 5 символов'}
            ref={passwordRef}
          />
        </div>
      </form>
      <Button type="primary" size="medium" onClick={submitHandler} disabled={disabledSubmit}>Зарегистрироваться</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Уже зарегистрированы?          
        <Button type="secondary" size="medium" onClick={login}>Войти</Button>          
      </p>      
    </div>
  )
}

export default Register
