import TodoItem from '@pages/TodoItem';

function TodoList({ itemList, deleteItem, toggleDone }) {
  const list = itemList.map(item => (
    <TodoItem key={item._id} item={item} deleteItem={deleteItem} toggleDone={toggleDone} />
  ));
  return <ul className='todolist'>{list}</ul>;
}

export default TodoList;
