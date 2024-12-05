import { useSuspenseQuery } from '@tanstack/react-query';
import FetchOnRender from './03-FetchAsYouRender';
import axios from 'axios';

// 게시글 목록 조회 API 호출
function fetchPostList() {
  return axios.get(`https://11.fesp.shop/posts?type=brunch&delay=2000`, {
    headers: {
      'client-id': '00-brunch',
    },
  });
}

// 게시글 목록 조회하는 페이지
function PostList() {
  const { data } = useSuspenseQuery({
    queryKey: ['posts'],
    queryFn: () => fetchPostList(),
    select: (res) => res.data,
    staleTime: 1000 * 30,
  });

  return (
    <>
      <h2>총 게시물 : {data.item.length}건</h2>
    </>
  );
}

export default PostList;
