import { useEffect, useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }) {
  const initCount = Number(children);
  const [count, setCount] = useState(initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    setCount(count - step);
  };
  const handleUp = () => {
    setCount(count + step);
  };
  const handleReset = event => {
    setCount(initCount);
  };

  // 클릭하지 않아도 값이 자동으로 증가되게 하기 위해 setTimeout을 쓴다.
  // 페이지 로딩 1초 후에 자동으로 값 한번만 증가하려고 했지만, Counter 컴포넌트가 렌더링 될 때마다 이 함수가 호출되기 때문에 계속해서 실행된다.
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);

  // 마운트 될 때 한번만 값 증가를 시키기 위해서는 useEffect를 써야 한다.
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('[Mount] deps에 빈배열 지정');
  // }, []);

  // 계속해서 증가시키려면 deps를 지정하지 않아야 한다.
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('[Mount & Update] deps를 지정하지 않음');
  // });

  // step이 업데이트 될 때 실행
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('[Mount & Update] deps에 있는 값이 변경될 때 실행');
  // }, [step]);

  // useEffect(() => {
  //   console.log('setup 함수 호출');
  //   const timer = setInterval(() => {
  //     console.log(step, new Date());
  //   }, 1000);
  //   return () => {
  //     clearInterval(timer);
  //   };
  // }, [step]);

  // cleanup 함수를 지정해주지 않으면, timer가 누적되어 계속 실행된다.
  // useEffect(() => {
  //   console.log(step, 'setup 함수 호출');
  //   const timer = setInterval(() => {
  //     console.log(step, new Date());
  //   }, 1000);
  //   return () => {
  //     console.log(step, 'cleanup 함수 호출');
  //     clearInterval(timer);
  //   };
  // }, [step]);

  return (
    <div
      id='counter'
      style={{
        backgroundColor: '#aeccfc62',
        padding: '20px',
        marginBottom: '10px',
        borderRadius: '10px',
      }}
    >
      <h1>{count}</h1>
      <hr />
      <label htmlFor='step'>증감치</label>
      <input
        id='step'
        type='number'
        style={{ width: '40px' }}
        value={step}
        onChange={e => setStep(Number(e.target.value))}
      />
      <Button type='button' onClick={handleDown}>
        -
      </Button>
      <Button type='button' color='orange' onClick={handleReset}>
        {initCount}
      </Button>
      <Button type='button' onClick={handleUp}>
        +
      </Button>
    </div>
  );
}

export default Counter;
