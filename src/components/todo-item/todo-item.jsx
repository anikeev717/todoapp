import React from 'react';
import PropTypes from 'prop-types';
// import { formatDistanceToNow } from 'date-fns';

import { TodoItemInputForm } from '../todo-item-input-form/todo-item-input-form';
import { getFunctionWrapper } from '../../services/get-function-wrapper';
import { getShowingTime } from '../../services/get-showing-time';
import { getCreatedAgo } from '../../services/get-created-ago';

import classes from './todo-item.module.css';

export function TodoItem({
  id,
  label,
  timerTime,
  edited,
  completed,
  createdDate,
  editItem,
  onEdited,
  onCompleted,
  onDeleted,
  onTimerOn,
  activeId,
}) {
  const todoItemClasses = [completed ? classes.completed : '', edited ? classes.editing : ''].join(' ');

  const createdAgo = getCreatedAgo(createdDate);

  const showTime = getShowingTime(timerTime);

  const onPressComplete = () => getFunctionWrapper(activeId === id, onTimerOn, onCompleted);
  const onPressDelete = () => getFunctionWrapper(activeId === id, onTimerOn, onDeleted);
  const onPressTimer = () => getFunctionWrapper(!completed && (!activeId || activeId === id), onTimerOn);

  return (
    <div className={todoItemClasses}>
      <div className={classes.view}>
        <input className={classes.toggle} type="checkbox" onClick={onPressComplete} />
        <label htmlFor={id}>
          <span aria-hidden="true" className={classes.description} onClick={onPressComplete}>
            {label}
          </span>
          <span className={classes.timer}>
            <button
              className={`${classes['timer-button']} ${
                activeId === id ? classes['timer-button-pause'] : classes['timer-button-start']
              }`}
              onClick={onPressTimer}
              type="button"
            />
            {showTime}
          </span>
          <span className={classes.created}>{createdAgo}</span>
        </label>
        <button className={`${classes.icon} ${classes['icon-edit']}`} type="button" onClick={onEdited} />
        <button className={`${classes.icon} ${classes['icon-destroy']}`} type="button" onClick={onPressDelete} />
      </div>
      <TodoItemInputForm id={id} label={label} edited={edited} editItem={editItem} />
    </div>
  );
}

TodoItem.defaultProps = {
  edited: false,
  completed: false,
  createdDate: new Date(),
};

TodoItem.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  timerTime: PropTypes.number.isRequired,
  edited: PropTypes.bool,
  completed: PropTypes.bool,
  createdDate: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.instanceOf(Date)]),
  editItem: PropTypes.func.isRequired,
  onEdited: PropTypes.func.isRequired,
  onCompleted: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  onTimerOn: PropTypes.func.isRequired,
  activeId: PropTypes.number.isRequired,
};
