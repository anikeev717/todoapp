import React, { useContext } from 'react';

import { AppContext } from '../context/context';

import classes from './todo-filters.module.css';

export function TodoFilters() {
  const { filterName, onFilterChange } = useContext(AppContext);
  const elements = [
    { label: 'All', name: 'all' },
    { label: 'Active', name: 'active' },
    { label: 'Completed', name: 'completed' },
  ];

  const buttons = elements.map(({ label, name }) => {
    const selected = filterName === name;
    return (
      <li key={name}>
        <button className={selected ? classes.selected : ''} type="button" onClick={() => onFilterChange(name)}>
          {label}
        </button>
      </li>
    );
  });

  return <ul className={classes.filters}>{buttons}</ul>;
}
