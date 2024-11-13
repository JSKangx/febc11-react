import React from 'react';
import Button from './Button';

function Counter() {
  let [count, setCount] = React.useState(0);

  const handleDown = () => {
    setCount(count - 1);
  };
  const handleUp = () => {
    setCount(count + 1);
  };
  const handleReset = (event) => {
    setCount(0);
  };

  return (
    <div id='counter'>
      <h2>{count}</h2>
      <hr />
      <Button color='teal' onClick={handleDown}>
        -
      </Button>
      <Button color='orange' onClick={(event) => handleReset(event)}>
        0
      </Button>
      <Button color='teal' onClick={handleUp}>
        +
      </Button>
    </div>
  );
}

export default Counter;
