import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function Left3() {
  useEffect(() => {
    console.log('      # Left3 렌더링.');
  });

  // useSelector는 Redux의 상태에서 특정 값을 선택해 가져오는 훅이다.
  // useSelector에는 함수를 하나 전달함. 이 함수에 전달되는 매개변수는 Redux 스토어의 전체 상태 객체를 의미한다.
  // 상태를 전달받고, 상태에서 원하는 값을 리턴해주는 것
  // 함수에 전달되는 인자값은 counterReducer가 리턴해주는 값.
  // useSelector로 count 상태를 구독하는 컴포넌트만 리렌더링된다.
  const count = useSelector((state) => state.count);

  return (
    <div>
      <h3>Left3</h3>
      <span>{count}</span>
    </div>
  );
}

export default Left3;
