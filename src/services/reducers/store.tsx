import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './index';
import thunk from 'redux-thunk';
import { useDispatch } from 'react-redux';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk));

export const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;