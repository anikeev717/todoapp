import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { getValidTimeValue, getValidLabel } from '../../services/get-valid-values-functions';

import classes from './new-todo-item.module.css';

export function NewTodoItem({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [time, setTime] = useState({ min: '', sec: '' });
  const [emptyStatus, setEmptyStatus] = useState(false);
  const labelRef = useRef(null);
  const minRef = useRef(null);

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
      labelRef.current.focus();
    } else {
      setEmptyStatus(true);
      setTimeout(() => {
        setEmptyStatus(false);
      }, 1000);
    }
  };

  const onKeyEnter = (e, target = e.target) => {
    if (e.key === 'Enter') {
      if (e.target.value) target.focus();
      onSubmit(e);
    }
  };

  const { min, sec } = time;

  return (
    <form className={classes.header} onSubmit={onSubmit}>
      <h1>todos</h1>
      <input
        className={`${classes['new-todo']} ${emptyStatus && !label ? classes.empty : ''}`}
        placeholder="What needs to be done?"
        onKeyDown={(e) => onKeyEnter(e, minRef.current)}
        onChange={onLabelChange}
        value={label}
        ref={labelRef}
      />
      <input
        className={`${classes['new-todo']} ${classes['new-todo-timer']} ${
          emptyStatus && !min && !sec ? classes.empty : ''
        }`}
        placeholder="Min"
        onKeyDown={(e) => onKeyEnter(e, labelRef.current)}
        onChange={(e) => {
          onTimerChange(e, 'min');
        }}
        value={min}
        ref={minRef}
      />
      <input
        className={`${classes['new-todo']} ${classes['new-todo-timer']} ${
          emptyStatus && !min && !sec ? classes.empty : ''
        }`}
        placeholder="Sec"
        onKeyDown={(e) => onKeyEnter(e, labelRef.current)}
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
