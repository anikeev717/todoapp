import PropTypes from 'prop-types';

import './todo-list.css';

import { TodoItem } from '../todo-item/todo-item';

export function TodoList({ todos, onCompleted, onDeleted, onEdited, editItem, onTimerOn }) {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <TodoItem
          {...item}
          onCompleted={() => onCompleted(id)}
          onDeleted={() => onDeleted(id)}
          onEdited={() => onEdited(id)}
          onTimerOn={() => onTimerOn(id)}
          editItem={editItem}
        />
      </li>
    );
  });
  return <ul className="todo-list">{elements}</ul>;
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      timerTime: PropTypes.number,
      timerId: PropTypes.number,
      completed: PropTypes.bool,
      edited: PropTypes.bool,
      id: PropTypes.number,
      createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    })
  ).isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  editItem: PropTypes.func.isRequired,
  onTimerOn: PropTypes.func.isRequired,
};
