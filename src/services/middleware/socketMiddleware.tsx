export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket;

    return next => action => {
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, wsSendOrder, onOpen, onClose, onError, onMessage } = wsActions;
      
      if (type === wsInit) {
        socket = new WebSocket(`${wsUrl}`);
      }
      if (socket) {
        socket.onopen = event => {          
          dispatch({ type: onOpen, payload: event });          
        };

        socket.onerror = event => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = event => {          
          const { data } = event;
          const parsedData = JSON.parse(data);          
          dispatch({ type: onMessage, payload: parsedData });
        };

        socket.onclose = event => {
          dispatch({ type: onClose, payload: event });
        };

        // if (type === wsSendOrder) {
        //   const order = { ...payload, token: user.token };
        //   socket.send(JSON.stringify(order));
        // }
      }

      next(action);
    };
  };
};