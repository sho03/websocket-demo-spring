import { useEffect, useState } from 'react'
import './App.css'
import { useWebSocket } from './hooks/useWebSocket';
import { Message } from './components/Message';

function App() {

  const [messages, setMessages] = useState<string[]>([]);
  const [text, setText] = useState('');

  const onSubscribe = (message: string) => {
    setMessages(prev => [...prev, message]);
  }

  const { startConnect, sendMessage } = useWebSocket(onSubscribe);

  useEffect(() => {
    startConnect();
  }, [])

  return (
    <div className={"container"}>
      <div>
        <ul>
          {messages.map((message, index) => {
            return (
              <Message value={message} key={index}/>
            )
          })}
        </ul>
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
