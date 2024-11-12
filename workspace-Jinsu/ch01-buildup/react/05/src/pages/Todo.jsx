import TodoInput from './TodoInput';
import TodoList from './TodoList';

function Todo(props) {
  return (
    <div id='main'>
      <div id='container'>
        <ul>
          <li>
            <h2>쇼핑 목록</h2>
            <TodoInput addItem={props.addItem} />
            <TodoList
              itemList={props.itemList}
              toggleDone={props.toggleDone}
              deleteItem={props.deleteItem}
            />
            {/* <TodoList
              // 귀찮아서 props를 다 전달하기는 했지만 만약 TodoList에서 addItem 함수를 절대로 쓰면 안 된다면? 예상치 못한 에러가 날 수 있어서 그냥 안 넘기는 게 안전하다.
              {...props}
            /> */}
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Todo;
