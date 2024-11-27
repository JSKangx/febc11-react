import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function Right3({ countDown, reset, countUp }) {
  const step = useRef(1);

  useEffect(() => {
    console.log('      # Right3 렌더링.');
  });
  return (
    <div>
      <h3>Right3</h3>
      <button
        onClick={() => {
          countDown(step.current);
        }}
      >
        -{step.current}
      </button>
      <button
        onClick={() => {
          reset();
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          countUp(step.current);
        }}
      >
        +{step.current}
      </button>
    </div>
  );
}

Right3.propTypes = {
  countDown: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  countUp: PropTypes.func.isRequired,
};

export default Right3;
