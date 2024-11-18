import { useState } from 'react';
import './App.css';

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  return (
    <>
      <h2>03 상태관리 대상이 객체일 경우 주의 사항</h2>
      <div
        onPointerMove={e => {
          // position 객체의 속성을 직접 수정해도 상태 변경되지 않음
          position.x = e.clientX;
          position.y = e.clientY;

          // setter함수로 통째로 새로운 객체로 바꿔야 한다.
          const newPosition = { x: e.clientX, y: e.clientY };
          setPosition(newPosition);
        }}
        style={{
          position: 'relative',
          width: '100vw',
          height: '100vh',
        }}
      >
        <div
          style={{
            position: 'absolute',
            backgroundColor: 'red',
            borderRadius: '50%',
            transform: `translate(${position.x - 8}px, ${position.y - 67}px)`,
            left: -10,
            top: -10,
            width: 20,
            height: 20,
          }}
        />
      </div>
    </>
  );
}

export default App;
