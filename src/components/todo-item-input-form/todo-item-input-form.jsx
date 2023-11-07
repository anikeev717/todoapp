import PropTypes from 'prop-types';
import React, { useState, useContext } from 'react';

import { getValidLabel } from '../../services/get-valid-values-functions';
import { AppContext } from '../context/context';

import classes from './todo-item-input-form.module.css';

export function TodoItemInputForm({ label, id, edited }) {
  const { editItem } = useContext(AppContext);
  const [inputValue, setInputValue] = useState(label);

  const onLabelChange = (e) => {
    setInputValue(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const newLabel = getValidLabel(inputValue);
    if (newLabel) {
      editItem(id, newLabel);
      setInputValue(newLabel);
    }
  };

  const onEscape = (e) => {
    if (e.key === 'Escape') {
      editItem(id, label);
      setInputValue(label);
    }
  };

  if (edited) {
    return (
      <form onSubmit={onSubmit}>
        <input type="text" className={classes.edit} value={inputValue} onKeyDown={onEscape} onChange={onLabelChange} />
      </form>
    );
  }
  return null;
}

TodoItemInputForm.defaultProps = {
  edited: false,
};

TodoItemInputForm.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  edited: PropTypes.bool,
};
