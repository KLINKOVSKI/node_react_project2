import { WebSocketServer } from 'ws';
import { verifyToken } from '../utils/auth';
import { WebSocketMessage, WebSocketEventType } from '../types/websocket';

export const setupWebSocket = (wss: WebSocketServer) => {
  wss.on('connection', (ws, req) => {
    const token = req.url?.split('token=')[1];
    if (!token || !verifyToken(token)) {
      ws.close(1008, 'Invalid token');
      return;
    }

    ws.on('message', (data: string) => {
      try {
        const message: WebSocketMessage = JSON.parse(data);
        handleWebSocketMessage(ws, message);
      } catch (error) {
        console.error('WebSocket message error:', error);
      }
    });
  });
};

const handleWebSocketMessage = (ws: InstanceType<typeof WebSocket.WebSocket>, message: WebSocketMessage) => {
  switch (message.type) {
    case WebSocketEventType.TRACK_PROGRESS:
      // Broadcast track progress to all connected clients
      broadcastMessage({
        type: WebSocketEventType.TRACK_PROGRESS,
        data: message.data
      });
      break;
    case WebSocketEventType.PLAYLIST_UPDATE:
      // Notify clients about playlist changes
      broadcastMessage({
        type: WebSocketEventType.PLAYLIST_UPDATE,
        data: message.data
      });
      break;
  }
};

const broadcastMessage = (message: WebSocketMessage) => {
  wss.clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(message));
    }
  });
};

