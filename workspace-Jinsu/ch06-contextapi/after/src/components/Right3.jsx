import CounterContext from '@context/CounterContext';
import { SimpleContext } from '@context/SimpleContext';
import { useContext, useEffect } from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  const { hello } = useContext(SimpleContext);

  // CounterContext 구독함 (CounterContext의 상태변경이 리렌더링을 유발)
  // 아래 버튼들을 눌러서 count의 상태를 변경하면 Left3, Right3만 리렌더링됨.
  const {
    actions: { countUp, countDown, reset },
  } = useContext(CounterContext);

  return (
    <div>
      <h3>Right3 - {hello}</h3>
      <button onClick={() => countDown(1)}>-1</button>
      <button onClick={() => reset()}>0</button>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
