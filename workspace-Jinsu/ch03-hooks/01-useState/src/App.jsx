import { useState } from 'react';

function App() {
  const [input, setInput] = useState('hello');

  const handleInput = e => {
    setInput(e.target.value);
  };

  return (
    <>
      <h1>01 useState - 상태 관리</h1>
      <div>
        <input type='text' value={input} onChange={handleInput} />
        <br />
        <span>입력 메세지: {input}</span>
      </div>
    </>
  );
}

export default App;
