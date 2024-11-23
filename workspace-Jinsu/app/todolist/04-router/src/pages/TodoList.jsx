import { Link } from 'react-router-dom';

function TodoList() {
  return (
    <div id='main'>
      <h2>할일 목록</h2>
      <div className='todo'>
        <Link to='/todoadd'>추가</Link>
        <br />
        <form className='search'>
          <input type='text' autoFocus />
          <button type='submit'>검색</button>
        </form>
        <ul className='todolist'>
          <li>
            <span>1</span>
            <Link to='/tododetail'>잠자기</Link>
            <Link to='/list'>삭제</Link>
          </li>
          <li>
            <span>2</span>
            <Link to='/tododetail'>자바스크립트 복습</Link>
            <Link to='/list'>삭제</Link>
          </li>
          <li>
            <span>3</span>
            <Link to='/tododetail'>
              <s>리액트 과제 하기</s>
            </Link>
            <Link to='/list'>삭제</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TodoList;
