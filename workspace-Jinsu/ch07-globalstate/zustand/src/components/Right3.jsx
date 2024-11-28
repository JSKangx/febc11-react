import useCounterState from '@zustand/counter';
import { useEffect } from 'react';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // 전체를 다 꺼내오면 useCounterState함수가 반환하는 객체 전체를 가져오는 것이기에 count가 변경되면 Right3도 리렌더링 된다.
  // 이렇게 꺼내오면 countUp 함수만 꺼내오게 된다.
  const countUp = useCounterState((state) => state.countUp);

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
