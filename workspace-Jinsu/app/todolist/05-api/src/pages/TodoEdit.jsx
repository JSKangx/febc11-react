import { Link, useNavigate, useOutletContext } from 'react-router-dom';

function TodoEdit() {
  // Outlet 컴포넌트의 context 속성에 전달되는 값 추출
  const { item } = useOutletContext();

  // 프로그래밍 방식으로 페이지 이동에 사용
  // 페이지를 이동할 수 있는 navigate 함수 반환
  const navigate = useNavigate();

  // 수정 작업
  const onSubmit = (e) => {
    // 서버에 변경을 발생시키는 것이기 때문에 사용자에게 결과를 정확히 고지해줘야 한다.
    try {
      // 기본 동작 실행 방지
      e.preventDefault();
      // API 서버에 수정 요청 했다고 치고
      alert('할일이 수정되었습니다.');
      // 할일 상세보기로 이동
      // 한 페이지 위로 이동, relative: true - 상대 경로로 사용
      // navigate('..', { relative: true, replace: true }); // replace 해도, 뒤로가기 버튼 누르면 한번 더 상세 페이지에 머무르는 건 똑같다.
      // navigate(`/list/${item._id}`); // 절대 경로로 이동하는 것도 가능
      navigate(-1); // 수정 버튼 누르면 뒤로가기 한번 (수정되기 전 상세 페이지를 보여주는 거랑은 다른 문제)
    } catch (err) {
      console.error(err);
      alert('할일 수정에 실패했습니다.');
    }
  };

  return (
    <div id='main'>
      <h2>할일 수정</h2>
      <div className='todo'>
        <form onSubmit={onSubmit}>
          <label htmlFor='title'>제목 :</label>
          <input type='text' id='title' defaultValue={item.title} autoFocus />
          <br />
          <label htmlFor='content'>내용 :</label>
          <textarea id='content' cols='23' rows='5' defaultValue={item.content} />
          <br />
          <label htmlFor='done'>완료 :</label>
          <input type='checkbox' id='done' defaultChecked />
          <br />
          <button type='submit'>수정</button>
          <Link to='/list/1'>취소</Link>
        </form>
      </div>
    </div>
  );
}

export default TodoEdit;
