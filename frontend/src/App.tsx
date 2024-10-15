import { useEffect, useState } from 'react'
import './App.css'
import { Client } from '@stomp/stompjs';

function App() {

  const [messages, setMessages] = useState<string[]>([]);
  const [client, setClient] = useState<Client | null>(null);

  useEffect(() => {
    const stompClient = new Client({
      brokerURL: 'ws://localhost:8080/gs-guide-websocket',
      onConnect: () => {
        console.log('Connected to WebSocket');

        stompClient.subscribe('/topic/greetings', (message) => {
          if (message.body) {
            const json = JSON.parse(message.body);
            const content = json.content;
            setMessages(prev => [...prev, content])
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
  }, []);

  const sendMessage = (message: string) => {
    if (client && client.connected) {
      const body = { name: message }
      client.publish({
        destination: '/app/hello',
        body: JSON.stringify(body),
      })
    }
  };

  return (
    <div>
      <h1>WebSocket STOMP Chat</h1>
      <ul>
        {messages.map((message, index) => {
          return (
            <li key={index}>{message}</li>
          )
        })}
      </ul>
      <button onClick={() => sendMessage('Hello WebSocket!')}>Send Message</button>
    </div>
  )
}

export default App
