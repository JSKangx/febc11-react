function sayHello(strings, ...values) {
  let result = '';
  for (let i = 0; i < strings.length; i++) {
    if (strings[i]) result += strings[i];
    if (values[i]) result += `<strong>${values[i]}</strong>`;
  }

  return result;
}

// 출력 결과 : '안녕하세요, <strong>무지님</strong>. 오늘 날씨는 <strong>맑음</strong>입니다.'
const result = sayHello(['안녕하세요, ', '님. 오늘 날씨는 ', '입니다.'], '무지', '맑음');
console.log(result);

// 출력 결과 : '안녕하세요, <strong>데이지님</strong>. 오늘 날씨는 <strong>흐림</strong>입니다. 즐거운 <strong>하루</strong> 보내세요.'
const result2 = sayHello(
  ['안녕하세요, ', '님. 오늘 날씨는 ', '입니다. 즐거운', '보내세요'],
  '데이지',
  '흐림',
  '하루'
);
console.log(result2);

const userName = '무지';
const weather = '맑음';
const str = `안녕하세요 ${userName}님. 오늘 날씨는 ${weather}입니다.`;

// 태그드 템플릿 : ${}를 기준으로 배열로 나눠진다.
const result3 = sayHello`안녕하세요 ${userName}님. 오늘 날씨는 ${weather}입니다.`;
console.log(result3); // 안녕하세요 <strong>무지</strong>님. 오늘 날씨는 <strong>맑음</strong>입니다.
