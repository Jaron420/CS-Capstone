// src/utils/websocket.js
/*export function initWebSocket(projectId) {
  const token = localStorage.getItem('token');
  const ws = new WebSocket(
    `ws://localhost:8000/ws/collaboration/${projectId}/?token=${token}`,
  );

  ws.onopen = () => {
    console.log('WebSocket connection established');
  };

  ws.onmessage = event => {
    //    const data = JSON.parse(event.data);
    //// Handle incoming messages
    //handleMessage(data);

    console.log('Received message:', event.data);
  };

  ws.onclose = () => {
    console.log('WebSocket connection closed');
  };

  return ws;
}
*/

// src/utils/websocket.js
import { io } from 'socket.io-client';

export const initWebSocket = projectId => {
  const token = localStorage.getItem('token');
  const socket = io('http://localhost:8000', {
    query: {
      projectId,
      token,
    },
    transports: ['websocket'],
    autoConnect: false,
  });

  socket.on('connect', () => {
    console.log('WebSocket connection established');
  });

  socket.on('message', event => {
    console.log('Received message:', event);
  });

  socket.on('disconnect', () => {
    console.log('WebSocket connection closed');
  });

  return socket;
};
