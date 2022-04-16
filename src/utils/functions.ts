import React, { useEffect, useState } from 'react';
import { order } from './constants';

export const fotmatDate = (date: Date) => {
  const currentDate = new Date(date)    
  let day = '';
  if (new Date().getDay() === currentDate.getDay()) {
    day = 'сегодня'
  } else {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long'
    }
    day = currentDate.toLocaleString("ru", options)
  }  
  const GMTdifference = -currentDate.getTimezoneOffset()/60;
  const GMTsign = GMTdifference > 0 ? '+' : '-';
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
  }  ;
  const time = currentDate.toLocaleString("ru", optionsTime);
  
  return `${day.charAt(0).toUpperCase() + day.slice(1)}, ${time} i-GMT${GMTsign}${GMTdifference}`
}

export const useFormatStatus = (order: order) => {
  const [convertedStatus, setConvertedStatus] = useState({
    text: '',
    color: ''
  }); 

  useEffect (
    () => {
      if (order.status === 'done') {
        setConvertedStatus({
          ...convertedStatus,
          text: 'Выполнен',
          color: 'var(--text-primary-color)'
        })
        } else if (order.status === 'pending') {
          setConvertedStatus({
            ...convertedStatus,
            text: 'Готовится',
            color: '#00CCCC'
          })
        } else if (order.status === 'created') {
          setConvertedStatus({
            ...convertedStatus,
            text: 'Создан',
            color: 'var(--text-primary-color)'
          })
        } else {
          setConvertedStatus({
            ...convertedStatus,
            text: 'Отменён',
            color: 'var(--colors-interface-error)'
          })
        }
    }, [order]
  )

  return convertedStatus;
}