import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { countDown, countReset, countUp } from '@redux-toolkit/counterSlice';

function Right3() {
  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });

  // 상태값 수정하기 위해 useDispatch 훅으로 dispatch 함수를 불러옴.
  // 이 함수를 사용하기 위해서 인자값으로 사용할 객체의 메서드를 넣어줘야 함.
  const dispatch = useDispatch();

  return (
    <div>
      <h3>Right3</h3>
      <button onClick={() => dispatch(countDown(1))}>-1</button>
      <button onClick={() => dispatch(countReset())}>0</button>
      <button onClick={() => dispatch(countUp(1))}>+1</button>
    </div>
  );
}

export default Right3;
