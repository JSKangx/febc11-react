import useAxios from '@hooks/useAxios';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

function TodoDetail() {
  // URL의 파라미터를 추출할 때 사용
  // 라우터에 'list/:_id'로 등록된 컴포넌트가 호출되는 경우,
  // URL이 list/3이면, useParams는 { _id: 3 }을 반환.
  const { _id } = useParams();
  const [data, setData] = useState();
  const navigate = useNavigate();

  // useEffect(() => {
  //   // API 서버 통신 전 임시로 데이터 출력
  //   setData(DUMMY_DATA);
  // }, []);

  // useAxios를 사용하는 대신
  // const { data } = useAxios({ url: `/todolist/${_id}` });

  const myAxios = useAxiosInstance();
  // 서버로부터 상세정보를 조회해 오는 함수
  const fetchDetail = async () => {
    const res = await myAxios.get(`/todolist/${_id}`);
    setData(res.data);
  };

  // 최초에 데이터 받아올 때만 호출
  useEffect(() => {
    fetchDetail();
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
            <button type='button' onClick={() => navigate('/list')}>
              목록
            </button>
          </div>
          <Outlet context={{ item: data.item, refetch: fetchDetail }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
