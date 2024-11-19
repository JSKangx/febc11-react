import { Component, useState } from 'react';
import PropTypes from 'prop-types';

function ClickMe({ level }) {
  const [count, setCount] = useState(level || 1);

  const handleClick = () => {
    setCount(count + (level || 1));
  };

  return (
    <>
      <div>
        클릭 횟수 X {level || 1} : {count}
        <button onClick={handleClick}>클릭</button>
      </div>
    </>
  );
}

ClickMe.propTypes = {
  level: PropTypes.number,
};

function Parent() {
  return (
    <div>
      <h1>02 함수형 컴포넌트</h1>
      <ClickMe level={2} />
      <ClickMe level={5} />
      <ClickMe />
    </div>
  );
}

export default Parent;
