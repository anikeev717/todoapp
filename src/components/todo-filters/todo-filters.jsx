import React from 'react';
import PropTypes from 'prop-types';

import classes from './todo-filters.module.css';

export function TodoFilters({ filterName, onFilterChange }) {
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

TodoFilters.defaultProps = {
  filterName: 'all',
};

TodoFilters.propTypes = {
  filterName: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};
