import PropTypes from 'prop-types';

import './todo-list.css';

import TodoItem from '../todo-item';

function TodoList({ todos, onCompleted, onDeleted, onEdited, editItem }) {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <TodoItem
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...item}
          onCompleted={() => onCompleted(id)}
          onDeleted={() => onDeleted(id)}
          onEdited={() => onEdited(id)}
          editItem={editItem}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TodoList.defaultProps = {
  onCompleted: () => {
    // console.log('Transition function to toggle todo items status!');
  },
  onDeleted: () => {
    // console.log('Transition function to remove todo item!');
  },
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      completed: PropTypes.bool,
      edited: PropTypes.bool,
      id: PropTypes.number,
      createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    })
  ).isRequired,
  onCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
};

export default TodoList;
