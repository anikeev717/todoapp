import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './todo-item.css';

import { TodoItemInputForm } from '../todo-item-input-form/todo-item-input-form';

export function TodoItem({ id, editItem, label, completed, edited, createdDate, onCompleted, onEdited, onDeleted }) {
  let classNames = '';

  if (completed) {
    classNames += 'completed ';
  }

  if (edited) {
    classNames += 'editing ';
  }

  const createdAgo = `created ${formatDistanceToNow(createdDate, {
    includeSeconds: true,
  })} ago`;

  return (
    <div className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onCompleted} />
        <label htmlFor={id}>
          <span aria-hidden="true" className="description" onClick={onCompleted}>
            {label}
          </span>
          <span className="created">{createdAgo}</span>
        </label>
        <button className="icon icon-edit" type="button" onClick={onEdited} />
        <button className="icon icon-destroy" type="button" onClick={onDeleted} />
      </div>
      <TodoItemInputForm id={id} label={label} edited={edited} editItem={editItem} />
    </div>
  );
}

TodoItem.defaultProps = {
  completed: false,
  edited: false,
  createdDate: new Date(),
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  edited: PropTypes.bool,
  completed: PropTypes.bool,
  createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  editItem: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
};
