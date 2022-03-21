import React, { useState } from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [secretKey, setSecretKey] = useState('');
   
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <ul className={styles.items}>      
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={password} 
            onChange={e => setPassword(e.target.value)}
            name={'password'}   
            type={'text'}
            placeholder={'Введите новый пароль'}
            icon={'ShowIcon'}               
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
      <Button type="primary" size="medium">Сохранить</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вспомнили пароль?
          <Button type="secondary" size="medium">
            Войти
          </Button>
      </p>      
    </div>
  )
}

export default ResetPassword
