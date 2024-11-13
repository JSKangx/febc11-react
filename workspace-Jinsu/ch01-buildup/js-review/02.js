var itemList = [
  { no: 1, todo: '두부', done: true },
  { no: 2, todo: '계란', done: false },
  { no: 3, todo: '라면', done: true },
];

console.log(itemList[0]);
console.log(itemList[1]);

// (1) 배열 구조분해 할당
var [first, second, third] = itemList;
console.log(first);
console.log(second);
console.log(third);
// useState에서 많이 썼다.
// const [count, setCount] = useState();

// (2) 객체 구조분해 할당
console.log(second.no, second.todo, second.done);
// 위 문장을 객체 구조분해 할당으로 표현해보자
var { no, todo, done } = second;
console.log(no, todo, done); // '객체.속성' 으로 접근하지 않고도 사용 가능
// props 할 때 이걸 많이 썼다.
function myFun(second) {}
// 객체 구조 분해 할당으로 second 객체의 속성을 분해해서 받아올 수 있다.
function myFun2({ no, todo, done }) {}
