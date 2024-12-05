import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSuspenseQuery } from '@tanstack/react-query';

// 게시글 1건 조회 API 호출 함수
function fetchPost() {
  return axios.get(`https://11.fesp.shop/posts/1?delay=3000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 상세 조회 페이지
function FetchAsYouRender() {
  // useSuspenseQuery는 promise를 throw한다. 그 아래 코드들은 더이상 실행이 안 되니까 data가 없을 때 에러가 안 난다(데이터 있는지 없는지 체크 로직 안 해도 된다).
  // -> catch 블록이 없으면 부모 컴포넌트(Suspense)의 fallback을 렌더링 함
  // -> promise가 fullfiled되면 자식 내용을 가지고 리렌더링함.
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1],
    queryFn: () => fetchPost(),
    select: (res) => res.data,
    staleTime: 1000 * 30,
  });

  return (
    <>
      <h4>{data.item.title}</h4>
    </>
  );
}

// 댓글 목록 조회 API 호출
function fetchReplies() {
  return axios.get(`https://11.fesp.shop/posts/1/replies?delay=4000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 댓글 목록 페이지
export function Replies() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts', 1, 'replies'],
    queryFn: () => fetchReplies(),
    select: (res) => res.data,
    staleTime: 1000 * 30,
  });

  const list = data.item.map((item) => <li key={item._id}>{item.content}</li>);

  return (
    <>
      <ul>{list}</ul>
    </>
  );
}

export default FetchAsYouRender;
