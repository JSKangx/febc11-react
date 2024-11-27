import { useEffect, useState } from 'react';
import Left1 from '@components/Left1';
import Right1 from '@components/Right1';

function App() {
  // 상태는 Left3에 전달
  const [count, setCount] = useState(0);

  // 상태 관리 함수는 Right3에 전달
  const countUp = function (step) {
    setCount(count + step);
  };
  const countDown = function (step) {
    setCount(count - step);
  };
  const reset = function () {
    setCount(0);
  };

  useEffect(() => {
    console.log('# App 렌더링.');
  });

  return (
    <>
      <h1>Context API - Props Drilling</h1>
      <div id='container'>
        <h1>App</h1>
        <div id='grid'>
          <Left1 count={count} />
          <Right1 countUp={countUp} countDown={countDown} reset={reset} />
        </div>
      </div>
    </>
  );
}

export default App;
