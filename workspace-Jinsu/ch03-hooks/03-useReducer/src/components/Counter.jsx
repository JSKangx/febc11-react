import { useReducer, useState } from 'react';
import Button from './Button';
import PropTypes from 'prop-types';

Counter.propTypes = {
  children: PropTypes.string,
};

function Counter({ children = '0' }) {
  const initCount = Number(children);
  const [count, countDispatch] = useReducer(counterReducer, initCount);
  const [step, setStep] = useState(1);

  const handleDown = () => {
    countDispatch({ type: 'DOWN', value: step });
  };
  const handleUp = () => {
    countDispatch({ type: 'UP', value: step });
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
