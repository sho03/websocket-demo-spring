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
    <div className={"container"}>
      <div>
        <ul>
          {messages.map((message, index) => {
            return (
              <li key={index}>{message}</li>
            )
          })}
        </ul>
        <button onClick={startConnect}>connect</button>
      </div>
      <div className={"text_container"}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className={"text"}
        />
        <button onClick={() => sendMessage(text)} className={"button"}>Send Message</button>
      </div>
    </div>
  )
}

export default App
