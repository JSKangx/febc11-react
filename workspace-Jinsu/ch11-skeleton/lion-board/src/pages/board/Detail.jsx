import useAxiosInstance from '@hooks/useAxiosInstance';
import CommentList from '@pages/board/CommentList';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

export default function Detail() {
  const axios = useAxiosInstance();

  // routes.jsx에서 /:type 이라고 해놨기 때문에
  // localhost/info => { type: info }가 된다.
  // 주소창에서 type 키에 설정된 값을 꺼내온다.
  // localhost/free에 접속하면 type: free가 되기에 '/posts/free'로 서버 요청을 보낸다.
  const { type, _id } = useParams();
  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  console.log(data);

  if (!data) {
    return (
      <div className='mt-0 mx-auto text-center'>
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  return (
    <main className='container mx-auto mt-4 px-4'>
      <section className='mb-8 p-4'>
        <form action='/info'>
          <div className='font-semibold text-xl'>제목 : {data.item.title}</div>
          <div className='text-right text-gray-400'>작성자 : {data.item.user.name}</div>
          <div className='mb-4'>
            <div>
              <pre className='font-roboto w-full p-2 whitespace-pre-wrap'>{data.item.content}</pre>
            </div>
            <hr />
          </div>
          <div className='flex justify-end my-4'>
            <Link
              to={`/${type}`}
              className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
            >
              목록
            </Link>
            <Link
              to={`/${type}/${_id}/edit`}
              className='bg-gray-900 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
            >
              수정
            </Link>
            <button
              type='submit'
              className='bg-red-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
            >
              삭제
            </button>
          </div>
        </form>
      </section>

      <CommentList />
    </main>
  );
}
