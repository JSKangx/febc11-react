import ListItem from '@/app/[type]/ListItem';
import Link from 'next/link';

// 게시물 목록 조회
// next에서는 fetch api로도 데이터 캐싱 등을 편리하게 할 수 있다(useQuery 안 써도 됨).
async function fetchPosts(type) {
  const url = `https://11.fesp.shop/posts?type=${type}`;
  const res = await fetch(url, {
    headers: { 'client-id': '00-board' },
  });
  return await res.json();
}

// 동적으로 메타데이터를 설정해야 한다면, generateMetadata 함수를 만들고, 메타 데이터 '객체'를 반환해주면 된다.
export async function generateMetadata({ params }) {
  const { type } = await params;

  return {
    title: `${type} 게시물 목록`,
    description: '게시물 목록 페이지입니다.',
  };
}

export default async function Page({ params }) {
  // next 14버전까지 : next가 주소창에 있는 params를 props로 넘겨준다.
  // const { type } = params;

  // next 15이후
  const { type } = await params;

  const data = await fetchPosts(type);
  console.log(data.item.length, '건 조회됨');

  // data 없으면 로딩중 보여주는 검증 작업을 할 필요가 없다. 왜냐하면 이건 서버 컴포넌트(node.js가 실행하는 코드)다. 서버에서 결과물을 만들어서 보내주기 때문(SSR)에 받아오는 시점에는 데이터가 없을 수가 없다.
  // 로딩을 할 때는 어떻게 하면 되냐? Loading이라는 컴포넌트를 만들면 된다.

  const list = data.item.map((item) => <ListItem key={item._id} item={item} />);

  return (
    <>
      <main className='min-w-80 p-10'>
        <div className='text-center py-4'>
          <h2 className='pb-4 text-2xl font-bold text-gray-700 dark:text-gray-200'>
            {type} 게시판
          </h2>
        </div>
        <div className='flex justify-end mr-4'>
          <form action='#'>
            <input
              className='dark:bg-gray-600 bg-gray-100 p-1 rounded'
              type='text'
              name='keyword'
            />
            <button
              type='submit'
              className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
            >
              검색
            </button>
          </form>

          <Link
            href={`/${type}/new`}
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
                <Link href='/info?page=1'>1</Link>
              </li>
              <li>
                <Link href='/info?page=2'>2</Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </>
  );
}
