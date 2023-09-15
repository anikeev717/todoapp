import React from 'react';
import PropTypes from 'prop-types';

import './footer.css';

import TodoFilters from '../todo-filters';

function Footer({ todoLeft, onClearCompleted, filterName, onFilterChange }) {
  return (
    <footer className="footer">
      <span className="todo-count">{todoLeft} items left</span>
      <TodoFilters filterName={filterName} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={onClearCompleted} type="button">
        Clear completed
      </button>
    </footer>
  );
}

Footer.defaultProps = {
  todoLeft: Infinity,
  filterName: 'all',
  onClearCompleted: () => {
    // console.log('Clear completed todo items!');
  },
  onFilterChange: () => {
    // console.log('Transition function to changing filter for todo items');
  },
};

Footer.propTypes = {
  todoLeft: PropTypes.number,
  onClearCompleted: PropTypes.func,
  filterName: PropTypes.oneOf(['all', 'active', 'completed']),
  onFilterChange: PropTypes.func,
};
export default Footer;
