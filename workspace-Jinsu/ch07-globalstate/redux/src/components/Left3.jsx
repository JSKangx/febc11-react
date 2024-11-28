import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  // redux 이용한 상태관리
  // useSelector에는 함수를 하나 전달함.
  // 상태를 전달받고, 상태에서 원하는 값을 리턴해주는 것
  // 함수에 전달되는 인자값은 counterReducer가 리턴해주는 값.
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
