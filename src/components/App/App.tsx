import React, { useEffect } from 'react';
import { BrowserRouter as Router }from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import appStyle from './App.module.css';
import RouteSwitch from '../RouteSwitch/RouteSwitch'
import { useDispatch, useSelector } from 'react-redux';
import { getItems } from '../../services/actions/products';
import { RootState } from '../../services/reducers';
import { Loader } from '../../ui/Loader/Loader';


const App = () => {   
  const dispatch = useDispatch();  
  
  useEffect(
    () => {
      dispatch(getItems());
    },
    [dispatch]
  );

  // 2022-04-11T12:50:47.976Z
  // Сегодня, 16:20 i-GMT+3
  // const date = new Date('2022-04-11T12:50:47.976Z')
  // const today = new Date().getDay()
  // const options = {
  //   weekday: date.getDay() === today ? 'Сегодня' : "long",
  //   hour: 'numeric',
  //   minute: 'numeric'
  // }

  // console.log(date.toLocaleString("ru", options))

  const isLoarding = useSelector((state:RootState) => state.products.itemsRequest);  
  
  if (isLoarding) {
    return (<Loader size="large" inverse={true}/>)
  }
  
  return (
    <Router>
      <div className={appStyle.app}>
        <AppHeader />
        <RouteSwitch/>
      </div>
    </Router>
    
  );
}

export default App;
