import { order } from '../../utils/constants'

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_GET_ORDERS: 'WS_GET_ORDERS' = 'WS_GET_ORDERS';
export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';

interface IwsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

interface IwsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}

interface IwsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

interface IwsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

interface IwsGetOrders {
  readonly type: typeof WS_GET_ORDERS;
  readonly payload:  { 
    orders: [order], 
    success: boolean, 
    total:number, 
    totalToday:number 
  }
}

export interface IwsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload:  string
}

export type IwsActions = 
| IwsConnectionSuccess
| IwsConnectionError
| IwsConnectionClosed
| IwsGetOrders
| IwsSendMessage
| IwsConnectionStart

export const wsConnectionSuccess = (): IwsActions => {
  return {
    type: WS_CONNECTION_SUCCESS
  };
};

export const wsConnectionError = (): IwsActions => {
  return {
    type: WS_CONNECTION_ERROR
  };
};

export const wsConnectionClosed = (): IwsActions => {
  return {
    type: WS_CONNECTION_CLOSED
  };
};

export const wsGetOrders = (orders: [order], success: boolean, total:number, totalToday:number): IwsActions => {
  return {
    type: WS_GET_ORDERS,
    payload: { orders, success, total, totalToday }
  };
};

export const wsSendMessage = (message: string) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message
  };
};
