import React from 'react';
import PropTypes from 'prop-types';

import { TodoFilters } from '../todo-filters/todo-filters';

import classes from './footer.module.css';

export function Footer({ todoLeft, onClearCompleted, filterName, onFilterChange }) {
  return (
    <footer className={classes.footer}>
      <span className={classes['todo-count']}>{todoLeft} items left</span>
      <TodoFilters filterName={filterName} onFilterChange={onFilterChange} />
      <button className={classes['clear-completed']} onClick={onClearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoLeft: Infinity,
  filterName: 'all',
};

Footer.propTypes = {
  todoLeft: PropTypes.number,
  onClearCompleted: PropTypes.func.isRequired,
  filterName: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func.isRequired,
};
