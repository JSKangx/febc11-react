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
  // 페이지 로딩 1초 후에 자동으로 값 한번만 증가하려고 했지만, handleUp 함수의 호출에 따라 count가 변경되고, 상태가 변경된 Counter 컴포넌트가 렌더링 될 때마다 이 함수가 호출되기 때문에 계속해서 실행된다.
  // setTimeout(() => {
  //   handleUp();
  // }, 1000);

  // 마운트 될 때 한번만 값 증가를 시키기 위해서는 useEffect를 써야 한다.
  // deps가 변경될 때만 setup 함수가 실행되므로 이 함수는 마운트 될 때만 실행된다.
  // useEffect(() => {
  //   setTimeout(() => {
  //     handleUp();
  //   }, 1000);
  //   console.log('[Mount] deps에 빈배열 지정');
  // }, []);

  // 계속해서 증가시키려면 deps를 지정하지 않아야 한다. 마치 useEffect 없이 쓴 것과 같다.
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

  // cleanup 함수 : useEffect의 setup 함수가 리턴하는 함수.
  // cleanup 함수는 컴포넌트가 언마운트 될 때 실행된다.
  /*
    useEffect의 실행 순서
    1. 마운트될 때 setup 함수 호출
      - 1초마다 step 값과 현재 시각을 콘솔에 찍음.
      - 이 함수는 step이 변경될 때 다시 호출됨.
      - step이 변경된 즉시 또 다른 timer가 실행됨. 총 2개의 타이머가 계속해서 자기 갈길을 가면서 로그를 찍음.
    2. 그러나 cleanup 함수가 있다면 컴포넌트가 언마운트 될 때 cleanup 함수가 실행됨.
      - step이 변경되면 컴포넌트가 언마운트 -> 리렌더링 됨.
      - 컴포넌트가 언마운트 될 때 실행되는 cleanup 함수는 타이머 작동을 중지시키는 clearInterval함수임.
      - 이전 타이머는 중지되고 새로운 타이머만 실행됨.
    3. SPA인 리액트는 페이지를 넘어가면서 작동하지 않기 때문에 이전에 했던 작업을 중단시켜주지 않으면 계속해서 백그라운드에서 동작하게 된다. 하던 작업을 종료시키는 cleanup 함수를 지정해주는 것이 성능면에서 굉장히 중요하다.
  */
  useEffect(() => {
    console.log('setup 함수 호출');
    const timer = setInterval(() => {
      console.log(step, new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [step]);

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
