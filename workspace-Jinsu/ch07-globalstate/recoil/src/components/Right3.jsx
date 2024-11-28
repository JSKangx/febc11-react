import { countState } from '@recoil/atoms';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // const [count, setCount] = useRecoilState(countState);
  const setCount = useSetRecoilState(countState);

  const countUp = (step) => {
    // countState에서 가져온 이전 상태 정보를 인자값으로 넘겨받는다.
    setCount((count) => count + step);
  };

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => countUp(1)}>+1</button>
    </div>
  );
}

export default Right3;
