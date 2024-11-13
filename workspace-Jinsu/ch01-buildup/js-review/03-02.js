// 1. 대입 연산자로 newItem 생성
var item = { no: 1, todo: '두부', done: true };
var newItem = item;

// 새롭게 생성된 newItem.done을 false로 변경
newItem.done = false;
console.log(item, newItem); // {no: 1, todo: '두부', done: false}
console.log('같은 객체인가? :', item === newItem); // true
// newItem.done을 교체해도 주소를 따라가서 교체하기 때문에 item.done도 변경된다.

// 2. Object.assign() 메서드 사용
// Object.assgin(target, ...source) target 객체에 source 객체들의 속성을 추가하여 target을 반환해준다.
// 여러 객체의 속성을 합치고 싶을 때 사용한다.
var item = { no: 1, todo: '두부', done: true };
var newItem = Object.assign(item, { delete: true });
console.log(item, newItem); // {no: 1, todo: '두부', done: false, delete: true}
console.log('같은 객체인가? :', item === newItem); // true
// Object.assign을 통해 새로운 객체를 만들고 싶다면 첫번째 인자를 빈 객체로 전달해주면 된다.
var item = { no: 1, todo: '두부', done: true };
var newItem = Object.assign({}, item, { delete: true });
console.log(item, newItem);
console.log('같은 객체인가? :', item === newItem); // false

// 3. item의 속성으로 새로운 객체의 속성값을 지정
var item = { no: 1, todo: '두부', done: true };
var newItem = { no: item.no, todo: item.todo, done: item.done };
console.log(item, newItem); // {no: 1, todo: '두부', done: true}
console.log('같은 객체인가? :', item === newItem); // false

// 4. 전개 연산자를 이용한 복사
var item = { no: 1, todo: '두부', done: true };
var newItem = { ...item };
console.log(item, newItem); // {no: 1, todo: '두부', done: true}
console.log('같은 객체인가? :', item === newItem); // false
