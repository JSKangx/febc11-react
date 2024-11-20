import { useReducer, useRef } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }) {
  const initCount = Number(children);
  const [count, countDispatch] = useReducer(counterReducer, initCount);
  // 증감치가 변한다고 해서 화면 Counter 전체가 리렌더링 될 필요는 없다.
  const step = useRef(1); // { current : 1 } 반환

  const handleDown = () => {
    countDispatch({ type: 'DOWN', value: step.current });
  };
  const handleUp = () => {
    countDispatch({ type: 'UP', value: step.current });
  };
  const handleReset = event => {
    countDispatch({ type: 'RESET', value: initCount });
  };

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
        defaultValue={step.current}
        onChange={e => (step.current = Number(e.target.value))}
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

// 현재 상태와 action 객체를 받아서 새로운 상태를 반환하는 순수 함수
function counterReducer(state, action) {
  let newState;

  switch (action.type) {
    case 'DOWN':
      newState = state - action.value;
      break;
    case 'UP':
      newState = state + action.value;
      break;
    case 'RESET':
      newState = action.value;
      break;
    default:
      newState = state;
  }

  return newState;
}

export default Counter;
