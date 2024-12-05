import useAxios from '@hooks/useAxios';
import useAxiosInstance from '@hooks/useAxiosInstance';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate, useParams } from 'react-router-dom';

function TodoDetail() {
  const { _id } = useParams();

  const navigate = useNavigate();

  const axios = useAxiosInstance();

  const { data, isLoading } = useQuery({
    queryKey: ['todolist', _id],
    queryFn: () => axios.get(`/todolist/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 60,
  });

  return (
    <div id='main'>
      <h2>할일 상세 보기</h2>
      {isLoading && <div>Loading...</div>}
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
          <Outlet context={{ item: data.item }} />
        </>
      )}
    </div>
  );
}

export default TodoDetail;
