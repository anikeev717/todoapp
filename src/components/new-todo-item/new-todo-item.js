import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-todo-item.css';

export default class NewTodoItem extends Component {
  constructor() {
    super();

    this.state = { label: '' };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      const { label } = this.state;
      const { onItemAdded } = this.props;
      e.preventDefault();
      if (label) {
        onItemAdded(label);
        this.setState({ label: '' });
      }
    };
  }

  render() {
    const { label } = this.state;

    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input className="new-todo" placeholder="What needs to be done?" onChange={this.onLabelChange} value={label} />
      </form>
    );
  }
}

NewTodoItem.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
