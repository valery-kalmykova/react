import React, { useState} from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux';
import { TAB_SWITCH } from '../../services/actions/products';
// import { RootState } from '../../services/reducers/index'

interface RootState {
  products: {
    currentTab: string
  }  
}

export const Tabs = () => {
  const currentTab = useSelector((state: RootState) => state.products.currentTab);
  const dispatch = useDispatch();
  const setCurrent = () => {
    dispatch({ type: TAB_SWITCH });
  }

  return (
    <div style={{ display: 'flex' }} className='mb-10'>
      <Tab value="Булки" active={currentTab === 'Булки'} onClick={setCurrent}>
        Булки
      </Tab>
      <Tab value="Соусы" active={currentTab === 'Соусы'} onClick={setCurrent}>
        Соусы
      </Tab>
      <Tab value="Начинки" active={currentTab === 'Начинки'} onClick={setCurrent}>
        Начинки
      </Tab>
    </div>
  )
}