import Message from './components/Message';
import './App.css';

function App() {
  return (
    <div className='wrapper'>
      <h2>01 state 대신 컴포넌트 외부의 변수(모듈 스코프 변수) 사용시 문제점</h2>
      <Message />
      <Message />
    </div>
  );
}

export default App;
