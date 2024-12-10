import ListItem from '@pages/board/ListItem';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosInstance from '@hooks/useAxiosInstance';

export default function List() {
  const axios = useAxiosInstance();

  // routes.jsx에서 /:type 이라고 해놨기 때문에
  // localhost/info => { type: info }가 된다.
  // 주소창에서 type 키에 설정된 값을 꺼내온다.
  // localhost/free에 접속하면 type: free가 되기에 '/posts/free'로 서버 요청을 보낸다.
  const { type } = useParams();
  const { data } = useQuery({
    queryKey: ['posts', type],
    queryFn: () => axios.get('/posts', { params: { type } }),
    select: (res) => res.data,
    staleTime: 1000 * 10,
  });

  if (!data) {
    return (
      <div className='mt-0 mx-auto text-center'>
        로딩중... <br />
        잠시만 기다려주세요
      </div>
    );
  }

  const list = data.item.map((item) => <ListItem key={item._id} item={item}></ListItem>);

  return (
    <main className='min-w-80 p-10'>
      <div className='text-center py-4'>
        <h2 className='pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200'>정보 공유</h2>
      </div>
      <div className='flex justify-end mr-4'>
        <form action='#'>
          <input className='dark:bg-gray-600 bg-gray-100 p-1 rounded' type='text' name='keyword' />
          <button
            type='submit'
            className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
          >
            검색
          </button>
        </form>

        <Link
          // 현재 주소(게시판 종류) 뒤에 /new가 붙는 링크로 이동
          to='new'
          className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
        >
          글작성
        </Link>
      </div>
      <section className='pt-10'>
        <table className='border-collapse w-full table-fixed'>
          <colgroup>
            <col className='w-[10%] sm:w-[10%]' />
            <col className='w-[60%] sm:w-[30%]' />
            <col className='w-[30%] sm:w-[15%]' />
            <col className='w-0 sm:w-[10%]' />
            <col className='w-0 sm:w-[10%]' />
            <col className='w-0 sm:w-[25%]' />
          </colgroup>
          <thead>
            <tr className='border-b border-solid border-gray-600'>
              <th className='p-2 whitespace-nowrap font-semibold'>번호</th>
              <th className='p-2 whitespace-nowrap font-semibold'>제목</th>
              <th className='p-2 whitespace-nowrap font-semibold'>글쓴이</th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>조회수</th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>댓글수</th>
              <th className='p-2 whitespace-nowrap font-semibold hidden sm:table-cell'>작성일</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </table>
        <hr />

        <div>
          <ul className='flex justify-center gap-3 m-4'>
            <li className='font-bold text-blue-700'>
              <Link to='/info?page=1'>1</Link>
            </li>
            <li>
              <Link to='/info?page=2'>2</Link>
            </li>
          </ul>
        </div>
      </section>
    </main>
  );
}
