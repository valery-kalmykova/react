import React, { useEffect } from 'react';
import { BrowserRouter as Router }from 'react-router-dom';
import AppHeader from '../AppHeader/AppHeader';
import appStyle from './App.module.css';
import RouteSwitch from '../RouteSwitch/RouteSwitch'
import { useDispatch, useSelector } from '../../services/hooks/hooks';
import { getItems } from '../../services/actions/products';
import { Loader } from '../../ui/Loader/Loader';

const App = () => {   
  const dispatch = useDispatch(); 
  
  useEffect(
    () => {
      dispatch(getItems());  
    },
    [dispatch]
  );

  const isLoarding = useSelector(state => state.products.itemsRequest);  
  
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
