import { useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';

const DUMMY_DATA = {
  item: {
    _id: 5,
    title: 'Javascript 공부',
    content: '열심히 하자',
    done: false,
    createdAt: '2024.11.21 16:49:00',
    updatedAt: '2024.11.21 16:49:00',
  },
};

function TodoDetail() {
  // URL의 파라미터를 추출할 때 사용
  // 라우터에 'list/:_id'로 등록된 컴포넌트가 호출되는 경우,
  // URL이 list/3이면, useParams는 { _id: 3 }을 반환.
  const { _id } = useParams();
  console.log(_id);

  const [data, setData] = useState();

  useEffect(() => {
    // API 서버 통신 전 임시로 데이터 출력
    setData(DUMMY_DATA);
  }, []);

  return (
    <div id='main'>
      <h2>할일 상세 보기</h2>
      {data && (
        <>
          {/* 조건부 렌더링일 때에도 root 태그는 하나여야 하기에 fragment 추가 */}
          <div className='todo'>
            <div>제목 : {data.item.title}</div>
            <div>내용 : {data.item.content}</div>
            <div>상태 : {data.itemdone ? '완료' : '미완료'}</div>
            <div>작성일 : {data.item.createdAt}</div>
            <div>수정일 : {data.item.updatedAt}</div>
            <Link to='./todoedit'>수정</Link>
            <Link to='/list'>목록</Link>
          </div>
          <Outlet context={{ item: data.item }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
