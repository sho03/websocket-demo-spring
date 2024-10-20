import { Client } from '@stomp/stompjs';
import { useRef } from 'react';

export function useWebSocket(onSubscribe: (value: string) => void) {

  const clientRef = useRef<Client | null>(null);

  const startConnect = () => {
    if (clientRef.current !== null) {
      return;
    }
    const stompClient = new Client({
      brokerURL: '/ws',
      onConnect: () => {
        stompClient.subscribe('/topic/messages', (message) => {
          if (message.body) {
            const json = JSON.parse(message.body);
            const content = json.content;
            onSubscribe(content)
          }
        });
      },
      onDisconnect: () => {
        console.log('Disconnected from WebSocket');
      },
      debug: (str) => {
        console.log(str);
      }
    });
    stompClient.activate();
    clientRef.current = stompClient;
  }

  const sendMessage = (value: string) => {
    if (clientRef.current && clientRef.current.connected) {
      const body = { content : value }
      clientRef.current.publish({
        destination: '/app/messages',
        body: JSON.stringify(body),
      })
    }
  };

  return { startConnect, sendMessage }
}

