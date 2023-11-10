import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { getValidTimeValue, getValidLabel } from '../../services/get-valid-values-functions';
import { useAutoFocus } from '../../hooks/use-auto-focus';

import classes from './new-todo-item.module.css';

export function NewTodoItem({ onItemAdded }) {
  const [label, setLabel] = useState('');
  const [time, setTime] = useState({ min: '', sec: '' });
  const [emptyStatus, setEmptyStatus] = useState(false);
  const labelRef = useAutoFocus();
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
  const withEmptyClass = (value) => [classes['new-todo'], emptyStatus && value ? classes.empty : ''].join(' ');

  return (
    <form className={classes.header} onSubmit={onSubmit}>
      <h1>todos</h1>
      <input
        className={`${withEmptyClass(!label)}`}
        placeholder="What needs to be done?"
        onKeyDown={(e) => onKeyEnter(e, minRef.current)}
        onChange={onLabelChange}
        value={label}
        ref={labelRef}
      />
      <input
        className={`${withEmptyClass(!min && !sec)}`}
        placeholder="Min"
        onKeyDown={(e) => onKeyEnter(e, labelRef.current)}
        onChange={(e) => {
          onTimerChange(e, 'min');
        }}
        value={min}
        ref={minRef}
      />
      <input
        className={`${withEmptyClass(!min && !sec)}`}
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
