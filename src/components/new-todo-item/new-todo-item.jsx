import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getValidTimeValue, getValidLabel } from '../../services/get-valid-values-functions';

import classes from './new-todo-item.module.css';

export function NewTodoItem({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [time, setTime] = useState({ min: '', sec: '' });

  const onLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const onTimerChange = (e, timeUnit) => {
    const newTime = JSON.parse(JSON.stringify(time));
    newTime[timeUnit] = getValidTimeValue(e.target.value);
    setTime(newTime);
  };

  const onSubmit = (e) => {
    const { min, sec } = time;
    const newLabel = getValidLabel(label);
    const newTime = Number(min) * 60 + Number(sec);
    e.preventDefault();
    if (newLabel && newTime) {
      onItemAdded(newLabel, newTime);
      setLabel('');
      setTime({ min: '', sec: '' });
    }
  };

  const onKeyEnter = (e) => {
    if (e.key === 'Enter') onSubmit(e);
  };

  const { min, sec } = time;

  return (
    <form className={classes.header} onSubmit={onSubmit}>
      <h1>todos</h1>
      <input
        className={classes['new-todo']}
        placeholder="What needs to be done?"
        onKeyDown={onKeyEnter}
        onChange={onLabelChange}
        value={label}
      />
      <input
        className={`${classes['new-todo']} ${classes['new-todo-timer']}`}
        placeholder="Min"
        onKeyDown={onKeyEnter}
        onChange={(e) => {
          onTimerChange(e, 'min');
        }}
        value={min}
      />
      <input
        className={`${classes['new-todo']} ${classes['new-todo-timer']}`}
        placeholder="Sec"
        onKeyDown={onKeyEnter}
        onChange={(e) => {
          onTimerChange(e, 'sec');
        }}
        value={sec}
      />
    </form>
  );
}

NewTodoItem.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
