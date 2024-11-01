import './Message.css';
export function Message(props: { value: string, key: number }) {

  const { value, key } = props;
  return (
    <li key={key} className={"message"}>
      { value }
    </li>
  )
}

