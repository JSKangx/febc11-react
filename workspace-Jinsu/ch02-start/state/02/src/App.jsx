import { useState } from 'react';

function App() {
  const [number, setNumber] = useState(0);

  return (
    <>
      <h2>02 이벤트 핸들러에서 state 값을 여러번 변경했을 때 문제점</h2>
      <p>{number}</p>
      <button
        onClick={() => {
          console.log('클릭 처리 시작', number);
          setNumber(num => num + 1);
          setNumber(num => num + 1);
          console.log('클릭 처리 종료', number);
        }}
      >
        +2
      </button>
    </>
  );
}

export default App;
