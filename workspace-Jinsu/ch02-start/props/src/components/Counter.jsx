import React from "react";

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
    <div id="counter">
      <button type="button" onClick={handleDown}>
        -
      </button>
      <button type="button" onClick={(event) => handleReset(event)}>
        0
      </button>
      <button type="button" onClick={handleUp}>
        +
      </button>
      <span>{count}</span>
    </div>
  );
}

export default Counter;