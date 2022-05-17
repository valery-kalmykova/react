import { compose, createStore, applyMiddleware } from 'redux';
import { rootReducer } from './index';
import thunk from 'redux-thunk';
import { socketMiddleware } from '../middleware/socketMiddleware';
import { wsUrl } from '../../utils/constants';
import { wsActions } from '../middleware/socketMiddleware'


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, enhancer);

export type AppDispatch = typeof store.dispatch;

