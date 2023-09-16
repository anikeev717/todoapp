import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './todo-filters.css';

export default class TodoFilters extends Component {
  constructor() {
    super();

    this.elements = [
      { label: 'All', name: 'all' },
      { label: 'Active', name: 'active' },
      { label: 'Completed', name: 'completed' },
    ];
  }

  render() {
    const { filterName, onFilterChange } = this.props;
    const buttons = this.elements.map(({ label, name }) => {
      const selected = filterName === name;
      const classNames = selected ? 'selected' : '';
      return (
        <li key={name}>
          <button className={classNames} type="button" onClick={() => onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return <ul className="filters">{buttons}</ul>;
  }
}

TodoFilters.defaultProps = {
  filterName: 'all',
};

TodoFilters.propTypes = {
  filterName: PropTypes.string,
  onFilterChange: PropTypes.func.isRequired,
};
