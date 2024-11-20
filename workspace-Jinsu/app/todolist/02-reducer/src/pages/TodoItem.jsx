import PropTypes from 'prop-types';

function TodoItem({ item, deleteItem, toggleDone }) {
  return (
    <li>
      <span>{item._id}</span>
      <span onClick={() => toggleDone(item._id)}>
        {item.done ? <s>{item.title}</s> : item.title}
      </span>
      <button type='button' onClick={() => deleteItem(item._id)}>
        삭제
      </button>
    </li>
  );
}

TodoItem.propTypes = {
  // item: PropTypes.object.isRequired, // 이렇게 간단하게 적어도 되고
  item: PropTypes.shape({
    _id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    done: PropTypes.bool, // 없어도 된다. 없으면 자동으로 undefined > Falsy값
  }),
  toggleDone: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
};

export default TodoItem;
