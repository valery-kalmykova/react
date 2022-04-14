export const socketMiddleware = (wsUrl, wsActions) => {
  return store => {
    let socket;    

    return next => action => {      
      const { dispatch } = store;
      const { type, payload } = action;
      const { wsInit, onOpen, onClose, onError, onMessage } = wsActions;
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
      }

      next(action);
    };
  };
};
