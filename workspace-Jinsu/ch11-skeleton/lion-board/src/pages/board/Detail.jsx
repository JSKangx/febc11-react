import useAxiosInstance from '@hooks/useAxiosInstance';
import CommentList from '@pages/board/CommentList';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Link, useNavigate, useParams } from 'react-router-dom';
import useUserStore from '../../zutand/userStore';
import { Helmet } from 'react-helmet-async';

export default function Detail() {
  const { user } = useUserStore();

  const axios = useAxiosInstance();

  const { type, _id } = useParams();
  const { data } = useQuery({
    queryKey: ['posts', _id],
    queryFn: () => axios.get(`/posts/${_id}`),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const removeItem = useMutation({
    mutationFn: (_id) => axios.delete(`/posts/${_id}`),
    onSuccess: () => {
      alert('게시물이 삭제되었습니다.');
      // 목록으로 돌아갔을 때 캐시된 데이터 말고(없애고) 최신 데이터 보여주기
      queryClient.invalidateQueries({ queryKey: ['posts', type] });
      navigate(`/${type}`);
    },
  });

  const onSubmit = (e) => {
    e.preventDefault();
    removeItem.mutate(_id);
  };

  if (!data) {
    return (
      <div className='mt-0 mx-auto text-center'>
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{data.item.title} - 멋사컴</title>
        <meta property='og:title' content={data.item.title} />
        <meta property='og:description' content={data.item.content} />
      </Helmet>
      <main className='container mx-auto mt-4 px-4'>
        <section className='mb-8 p-4'>
          <form onSubmit={onSubmit}>
            <div className='font-semibold text-xl'>제목 : {data.item.title}</div>
            <div className='text-right text-gray-400'>작성자 : {data.item.user.name}</div>
            <div className='mb-4'>
              <div>
                <pre className='font-roboto w-full p-2 whitespace-pre-wrap'>
                  {data.item.content}
                </pre>
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
              {/* 로그인한 유저와 게시글 작성한 유저의 아이디가 같으면 수정, 삭제 버튼 출력 */}
              {user?._id === data.item.user._id && (
                <>
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
                </>
              )}
            </div>
          </form>
        </section>

        <CommentList data={data.item.replies} />
      </main>
    </>
  );
}
