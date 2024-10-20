import { Client } from '@stomp/stompjs';
import { useState } from 'react';

export function useWebSocket(onSubscribe: (value: string) => void) {

  const [client, setClient] = useState<Client | null>(null);

  const startConnect = () => {
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
    setClient(stompClient);
  }

  const sendMessage = (value: string) => {
    if (client && client.connected) {
      const body = { content : value }
      client.publish({
        destination: '/app/messages',
        body: JSON.stringify(body),
      })
    }
  };

  return { startConnect, sendMessage }
}

