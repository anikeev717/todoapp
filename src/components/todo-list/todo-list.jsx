import PropTypes from 'prop-types';

import { TodoItem } from '../todo-item/todo-item';

import classes from './todo-list.module.css';

export function TodoList({ todos }) {
  const elements = todos.map((item) => {
    const { id } = item;

    return (
      <li key={id}>
        <TodoItem {...item} />
      </li>
    );
  });
  return <ul className={classes['todo-list']}>{elements}</ul>;
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      timerTime: PropTypes.number,
      completed: PropTypes.bool,
      edited: PropTypes.bool,
      id: PropTypes.number,
      createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
    })
  ).isRequired,
};
