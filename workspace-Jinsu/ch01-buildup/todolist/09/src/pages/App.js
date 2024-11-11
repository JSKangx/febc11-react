import kang from '../../../kang.js';
import Header from '../components/Header.js';
import Footer from '../components/Footer.js';
import Todo from './Todo.js';

function App() {
  // 샘플 목록
  // let itemList = [
  //   { no: 1, title: "두부", done: true },
  //   { no: 2, title: "계란", done: false },
  //   { no: 3, title: "라면", done: true },
  // ];

  const [itemList, setItemList] = kang.useState([
    { no: 1, title: '두부', done: true },
    { no: 2, title: '계란', done: false },
    { no: 3, title: '라면', done: true },
  ]);

  // "추가" 클릭 이벤트 핸들러
  const handleAdd = () => {
    const inputElem = document.querySelector('.todoinput > input');
    if (inputElem.value.trim() !== '') {
      addItem(inputElem.value);
      inputElem.value = '';
      inputElem.focus();
    }
  };

  // 엔터 이벤트 핸들러
  const handleAddKeyup = (event) => {
    if (event.key === 'Enter') handleAdd();
  };

  // 할일 추가
  function addItem(title) {
    const item = {
      no: itemList[itemList.length - 1].no + 1,
      title,
      done: false,
    };

    // TODO: 데이터 갱신 (set 함수로 값 변경 가능)
    /* 
      배열은 주소를 참조하기 때문에 단순히 itemList에 추가하면 안 된다.
      그러면 업데이트가 되면 두 개가 서로 같은 주소를 참조하고 있어서 항상 같다고 되어서 상태 변경이 안 된다.
    */
    const newItemList = [...itemList, item];
    setItemList(newItemList);
    // 축약형 setItemList([...itemList, item]);
  }

  // 완료/미완료 처리
  function toggleDone(no) {
    // TODO: 데이터 갱신
    const newItemList = [...itemList];
    let selectedItem = newItemList.find((item) => item.no === no);
    selectedItem.done = !selectedItem.done;

    setItemList(newItemList);
  }

  // 할일 삭제
  function deleteItem(no) {
    // TODO: 데이터 갱신
    // filter 메서드는 새 배열을 반환하기 때문에 old 배열 !== new 배열이기에 렌더링 조건에 만족. 스프레드 연산자로 깊은 복사 불필요.
    // 만약 splice로 배열을 조정하려면 원본배열을 변경(주소는 그대로)하기에 스프레드 연산자로 깊은 복사하여 새로운 배열 만들어주는 과정 필요.
    const newItemList = itemList.filter((item) => item.no !== no);
    setItemList(newItemList);
  }

  return kang.createElement(
    'div',
    { id: 'todo' },
    Header,
    Todo({ handleAdd, handleAddKeyup, itemList, toggleDone, deleteItem }),
    Footer,
  );
}

export default App;
