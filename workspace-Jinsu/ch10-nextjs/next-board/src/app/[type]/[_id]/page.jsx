import Link from 'next/link';

// 게시물 목록 조회
// next에서는 fetch api로도 데이터 캐싱 등을 편리하게 할 수 있다(useQuery 안 써도 됨).
async function fetchPost(_id) {
  const url = `https://11.fesp.shop/posts/${_id}`;
  const res = await fetch(url, {
    headers: { 'client-id': '00-board' },
  });
  return await res.json();
}

// 동적으로 메타데이터를 설정해야 한다면, generateMetadata 함수를 만들고, 메타 데이터 '객체'를 반환해주면 된다.
export async function generateMetadata({ params }) {
  const { _id } = await params;
  const data = await fetchPost(_id);

  return {
    title: data.item.title,
    description: data.item.content,
  };
}

export default async function Page({ params }) {
  const { _id } = await params;
  // 위에서도 호출했고, 여기서도 호출했지만 next는 데이터 캐싱을 지원하기 때문에 서버랑 2번 통신하지 않고, 캐시된 데이터를 반환해준다.
  // 자식 컴포넌트에서도 똑같은 데이터가 필요할 때 유용함. 자식 컴포넌트에서 api 서버를 다시 호출해도 캐시된 데이터를 반환해주기 때문에 props로 안 넘겨줘도 됨.
  const data = await fetchPost(_id);

  return (
    <>
      <main className='container mx-auto mt-4 px-4'>
        <section className='mb-8 p-4'>
          <form action='/info'>
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
                href='/info'
                className='bg-orange-500 py-1 px-4 text-base text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                목록
              </Link>
              <Link
                href='/info/1/edit'
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

        <section className='mb-8'>
          <h4 className='mt-8 mb-4 ml-2'>댓글 2개</h4>

          <div className='shadow-md rounded-lg p-4 mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <img
                className='w-8 mr-2 rounded-full'
                src='https://api.fesp.shop/files/00-sample/user-muzi.webp'
                alt='어피치 프로필 이미지'
              />
              <Link href='' className='text-orange-400'>
                어피치
              </Link>
              <time className='ml-auto text-gray-500' dateTime='2024.07.02 14:11:22'>
                2024.07.02 14:11:22
              </time>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <form action='#'>
                <pre className='whitespace-pre-wrap text-sm'>화이팅!</pre>
                <button
                  type='submit'
                  className='bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
                >
                  삭제
                </button>
              </form>
            </div>
          </div>

          <div className='shadow-md rounded-lg p-4 mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <img
                className='w-8 mr-2 rounded-full'
                src='https://api.fesp.shop/files/00-sample/user-muzi.webp'
                alt='무지 프로필 이미지'
              />
              <Link href='' className='text-orange-400'>
                무지
              </Link>
              <time className='ml-auto text-gray-500' dateTime='2024.07.07 12:34:56'>
                2024.07.07 12:34:56
              </time>
            </div>
            <div className='flex justify-between items-center mb-2'>
              <form action='#'>
                <pre className='whitespace-pre-wrap text-sm'>축하해요~~~</pre>
                <button
                  type='submit'
                  className='bg-red-500 py-1 px-2 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
                >
                  삭제
                </button>
              </form>
            </div>
          </div>

          <div className='p-4 border border-gray-200 rounded-lg'>
            <h4 className='mb-4'>새로운 댓글을 추가하세요.</h4>
            <form action='#'>
              <div className='mb-4'>
                <textarea
                  rows='3'
                  cols='40'
                  className='block p-2 w-full text-sm border rounded-lg border-gray-300 bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white'
                  placeholder='내용을 입력하세요.'
                  name='comment'
                ></textarea>

                <p className='ml-2 mt-1 text-sm text-red-500'>내용은 필수입니다.</p>
              </div>
              <button
                type='submit'
                className='bg-orange-500 py-1 px-4 text-sm text-white font-semibold ml-2 hover:bg-amber-400 rounded'
              >
                댓글 등록
              </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
}
