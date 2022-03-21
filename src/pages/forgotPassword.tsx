import React, { useState } from 'react';
import styles from './login.module.css';
import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components'


const ForgotPassword = () => {
  const [email, setEmail] = useState(''); 
  
  return (
    <div className={styles.main}>
      <h2 className='text text_type_main-medium mb-6'>Восстановление пароля</h2>
      <ul className={styles.items}>      
        <li className={styles.item + ' mb-6'}>
          <Input 
            value={email} 
            onChange={e => setEmail(e.target.value)}
            name={'email'}   
            type={'email'}
            placeholder={'Укажите e-mail'}               
          />
        </li>        
      </ul>
      <Button type="primary" size="medium">Зарегистрироваться</Button>
      <p className={styles.bottomText + ' text text_type_main-default text_color_inactive mt-20'}>
        Вспомнили пароль?
          <Button type="secondary" size="medium">
            Войти
          </Button>
      </p>      
    </div>
  )
}

export default ForgotPassword
