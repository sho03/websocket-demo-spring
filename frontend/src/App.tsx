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

  const sendMessageWrapper = () => {
    sendMessage(text);
    setText('');
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      sendMessageWrapper();
    }
  }

  return (
    <div className={"container"}>
      <ul className={"message_container"}>
        {messages.map((message, index) => {
          return (
            <Message value={message} key={index}/>
          )
        })}
      </ul>
      <div className={"text_container"}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          className={"text"}
        />
        <div className={"button_area"}>
          <button onClick={() => sendMessageWrapper()} className={"button"}>
            Send Message
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
