import React from 'react';
import PropTypes from 'prop-types';
import { formatDistanceToNow } from 'date-fns';

import './todo-item.css';

import { TodoItemInputForm } from '../todo-item-input-form/todo-item-input-form';

export function TodoItem({
  id,
  editItem,
  label,
  timerTime,
  timerId,
  completed,
  edited,
  createdDate,
  onCompleted,
  onEdited,
  onDeleted,
  onTimerOn,
  timerInProgress,
}) {
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

  const timerButtonClass = timerId ? 'pause' : 'start';

  const showTime = `${Math.floor(timerTime / 60)
    .toString()
    .padStart(2, '0')}:${(timerTime % 60).toString().padStart(2, '0')}`;

  const onFunctionCall = (propStatus, func = () => {}) => {
    if (propStatus) onTimerOn();
    func();
  };

  const onPressComplete = () => onFunctionCall(timerId, onCompleted);
  const onPressDelete = () => onFunctionCall(timerId, onDeleted);
  const onPressTimer = () => onFunctionCall(!completed && (!timerInProgress || timerId));

  return (
    <div className={classNames}>
      <div className="view">
        <input className="toggle" type="checkbox" onClick={onPressComplete} />
        <label htmlFor={id}>
          <span aria-hidden="true" className="description" onClick={onPressComplete}>
            {label}
          </span>
          <span className="timer">
            <button className={`timer-button timer-button-${timerButtonClass}`} onClick={onPressTimer} type="button" />
            {showTime}
          </span>
          <span className="created">{createdAgo}</span>
        </label>
        <button className="icon icon-edit" type="button" onClick={onEdited} />
        <button className="icon icon-destroy" type="button" onClick={onPressDelete} />
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
  timerTime: PropTypes.number.isRequired,
  timerId: PropTypes.number.isRequired,
  edited: PropTypes.bool,
  completed: PropTypes.bool,
  createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  editItem: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onTimerOn: PropTypes.func.isRequired,
};
