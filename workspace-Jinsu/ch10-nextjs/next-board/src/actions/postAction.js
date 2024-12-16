'use server'; // 서버 액션에 반드시 추가되어야 하는 지시자 (서버 컴포넌트로 만들겠다)
// 일반적으로는 서버 컴포넌트로 만들어지기 때문에 안 적어줘도 되는데, 서버 액션 호출하는 함수는 반드시 적어줘야 한다.

// 게시물 추가
export async function addPost(formData) {
  console.log('서버 액션 호출', formData);
  const data = {
    // formData.get : FormData의 속성 값을 얻을 수 있는 메서드
    type: formData.get('type'),
    title: formData.get('title'),
    content: formData.get('content'),
  };

  const res = await fetch('https://11.fesp.shop/posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'client-id': '00-board',
    },
    body: JSON.stringify(data),
  });

  return res.json();
}
