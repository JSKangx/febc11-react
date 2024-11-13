var itemList = [
  { no: 1, todo: '두부', done: false },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: false },
];

// 1. 대입 연산자
var newItemList = itemList;
newItemList[1].done = true;
console.log(itemList);
console.log(newItemList);
console.log(itemList[1] === newItemList[1]); // true

// 2. 전개 연산자를 이용한 복사 (얕은 복사)
var itemList = [
  { no: 1, todo: '두부', done: false },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: false },
];
var newItemList = [...itemList];
newItemList[1].done = true;
console.log(itemList);
console.log(newItemList);
console.log('같은 객체인가? :', itemList === newItemList); // false
console.log('같은 객체 멤버인가? :', itemList[1] === newItemList[1]); // true
// 스프레드 연산자로 배열 자체의 주소는 달라졌다. 하지만 배열 안에 있는 객체는 주소만 복사해왔기 때문에 얕은 복사가 이루어졌기에, 배열의 각 index는 같은 것을 가리키고 있음.
// React의 state는 얕은 비교를 해서 얕은 복사만 해도 상태가 바뀐 것으로 인식한다.
// 그러나 React에는 '상태는 불변성으로 관리해야 한다'는 원리가 있는데, 얕은 복사는 이 원리에는 어긋난다. 왜냐하면, 새로운 상태를 수정했지만 원래 상태가 수정되었기 때문에. 렌더링이 되어서 에러는 안 나지만, 리액트의 큰 전제와 어긋난다.

// 3. 상태 불변성을 지키기 위한 전개 연산자를 이용한 깊은 복사 (객체를 속성으로 가질 경우)
var itemList = [
  { no: 1, todo: '두부', done: false },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: false },
];
newItemList[1] = { ...itemList[1] }; // itemList[1]의 주소가 아닌 내용을 복사한다는 뜻.
newItemList[1].done = true;
console.log(itemList[1]); // {no: 2, todo: '계란', done: false}
console.log(newItemList[1]); // {no: 2, todo: '계란', done: true}
console.log('같은 객체인가? :', itemList === newItemList); // false
console.log('같은 객체 멤버인가? :', itemList[1] === newItemList[1]); // false

// 4. 객체 > 객체 > 객체 > ... 중첩 구조가 계속된다면? 나중에 배움.
