import { useState } from 'react';

const Message = () => {
  const [msg, setMsg] = useState('');
  const [count, setCount] = useState(0);

  const handleChange = e => {
    const inputMsg = e.target.value;
    setMsg(inputMsg);
    setCount(count + 1);
  };

  return (
    <div>
      <input type='text' onChange={handleChange} />
      <br />
      <span>입력 메시지: {msg}</span>
      <br />
      <span>입력 횟수: {count}</span>
    </div>
  );
};

export default Message;
