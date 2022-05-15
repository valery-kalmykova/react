import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_ORDERS,
  WS_SEND_MESSAGE
} from '../actions/wsActions';
import { Store } from 'redux';

interface TwsActions {
  wsInit: 'WS_CONNECTION_START',
  onOpen: 'WS_CONNECTION_SUCCESS',
  onClose: 'WS_CONNECTION_CLOSED',
  onError: 'WS_CONNECTION_ERROR',
  onMessage: 'WS_GET_ORDERS',
  wsSendMessage: 'WS_SEND_MESSAGE',
}

export const wsActions: TwsActions = {
  wsInit: WS_CONNECTION_START,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_ORDERS,
  wsSendMessage: WS_SEND_MESSAGE,
};

export const socketMiddleware = (wsUrl: string, wsActions: TwsActions) => {
  return (store: any) => {
    let socket: any;

    return (next: any) => (action: any) => {      
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage, wsSendMessage } = wsActions;
      const token = localStorage.getItem('accessToken');      
      
      if (type === wsInit) {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.close();          
        } 
        if (window.location.pathname.indexOf('/feed') === 0) {
          socket = new WebSocket(`${wsUrl}/all`);          
        } else if (window.location.pathname.indexOf('/profile/orders') === 0) {
          socket = new WebSocket(`${wsUrl}?token=${token}`);          
        }      
      } 
      if (socket) {
        socket.onopen = (event: any) => {                   
          dispatch({ type: onOpen, payload: event });          
        };

        socket.onerror = (event: any) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event: any) => {          
          const { data } = event;
          const parsedData = JSON.parse(data); 
          dispatch({ type: onMessage, payload: parsedData });
        };        
        
        socket.onclose = (event: any) => {
          dispatch({ type: onClose, payload: event });
        }; 

        if (type === wsSendMessage) {
          const message = { ...payload, token: token };
          socket.send(JSON.stringify(message));
        }

      }

      next(action);
    };
  };
};