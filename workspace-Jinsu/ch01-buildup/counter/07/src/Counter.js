import Kang from './kang.js';

function Counter() {
  // let count = 0;
  const [count, setCount] = Kang.useState(10);

  const handleDown = () => {
    // (1) 데이터 갱신 + useState를 통한 화면 렌더링
    setCount(count - 1); // count는 직접 못 바꾸고 setCount 함수로만 바꿀 수 있음.
  };

  const handleUp = () => {
    // (1) 데이터 갱신
    setCount(count + 1);
  };

  const handleReset = (event) => {
    // (1) 데이터 갱신
    setCount(0);
  };

  // prettier-ignore
  return (
    Kang.createElement("div", { id: "counter" },
      Kang.createElement("button", { type: "button", onclick: handleDown }, "-"),
      Kang.createElement("button", 
        { type: "button", onclick: (event) => handleReset }, 0),
      Kang.createElement("button", { type: "button", onclick: handleUp }, "+"),
      Kang.createElement("span", null, count))
  )
}

export default Counter;
