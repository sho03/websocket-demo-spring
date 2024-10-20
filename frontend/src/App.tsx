import { useState } from 'react'
import './App.css'
import { useWebSocket } from './hooks/useWebSocket';

function App() {

  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  const onSubscribe = (message: string) => {
    setMessages(prev => [...prev, message]);
  }

  const { startConnect, sendMessage } = useWebSocket(onSubscribe);

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
      <button onClick={startConnect}>connect</button>
      <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={() => sendMessage(text)}>Send Message</button>
    </div>
  )
}

export default App
