import './Message.css';
export function Message(props: { value: string, key: number }) {

  const { value, key } = props;

  const random = Math.random() >= 0.5;
  const positionClass = random ? "self" : "other";

  return (
    <li key={key} className={`message ${positionClass}`}>
      <div className={"message_text"}>
        { value }
      </div>
      <div className={"message_time"}>
        20:00
      </div>
    </li>
  )
}

