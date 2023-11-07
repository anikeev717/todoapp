import React, { useContext } from 'react';
import PropTypes from 'prop-types';
// import { formatDistanceToNow } from 'date-fns';

import { TodoItemInputForm } from '../todo-item-input-form/todo-item-input-form';
import { getFunctionWrapper } from '../../services/get-function-wrapper';
import { getShowingTime } from '../../services/get-showing-time';
import { getCreatedAgo } from '../../services/get-created-ago';
import { AppContext } from '../context/context';

import classes from './todo-item.module.css';

export function TodoItem({ id, label, timerTime, edited, completed, createdDate }) {
  const { onEdited, onCompleted, onDeleted, onTimerOn, activeId } = useContext(AppContext);

  const todoItemClasses = [completed ? classes.completed : '', edited ? classes.editing : ''].join(' ');

  const createdAgo = getCreatedAgo(createdDate);

  const showTime = getShowingTime(timerTime);

  const onPressComplete = () =>
    getFunctionWrapper(
      activeId === id,
      () => onTimerOn(id),
      () => onCompleted(id)
    );
  const onPressDelete = () =>
    getFunctionWrapper(
      activeId === id,
      () => onTimerOn(id),
      () => onDeleted(id)
    );
  const onPressTimer = () => getFunctionWrapper(!completed && (!activeId || activeId === id), () => onTimerOn(id));

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
        <button className={`${classes.icon} ${classes['icon-edit']}`} type="button" onClick={() => onEdited(id)} />
        <button className={`${classes.icon} ${classes['icon-destroy']}`} type="button" onClick={onPressDelete} />
      </div>
      <TodoItemInputForm id={id} label={label} edited={edited} />
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
};
