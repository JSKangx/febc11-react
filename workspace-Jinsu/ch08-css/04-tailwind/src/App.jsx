import Button from '@components/Button';
import Login from './Login';

function App() {
  return (
    <>
      <h1>04 Tailwind CSS 사용</h1>
      <div className='w-60 mt-3 mx-auto'>
        <Button size='sm'>그냥 버튼</Button>
        <Button bg='blue' color='red' size='lg'>
          파란 배경의 빨간 글자
        </Button>
        <Button bg='yellow' color='red' size='md'>
          노란 배경의 빨간 글자
        </Button>
        <Button bg='gray' color='blue' size='sm'>
          회색 배경의 파란 글자
        </Button>
        <button className='btn '>일반 버튼</button>
        <button className='btn btn-primary'>등록</button>
        <button className='btn btn-warn'>삭제</button>
      </div>
      <Login />
    </>
  );
}

export default App;
