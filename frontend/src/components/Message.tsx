import './Message.css';
export function Message(props: { value: string, key: number }) {

  const { value, key } = props;
  return (
    <li key={key} className={"message"}>
      <div className={"message_text"}>
        { value }
      </div>
      <div className={"message_time"}>
        20:00
      </div>
    </li>
  )
}

