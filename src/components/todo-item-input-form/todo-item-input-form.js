import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './todo-item-input-form.css';

export default class TodoItemInputForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      inputValue: props.label,
    };

    this.onLabelChange = (e) => {
      this.setState({
        inputValue: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      const { inputValue } = this.state;
      const { id, editItem } = this.props;
      if (inputValue.trimStart()) editItem(id, inputValue);
    };
  }

  render() {
    const { edited } = this.props;
    const { inputValue } = this.state;
    if (edited) {
      return (
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" value={inputValue} onChange={this.onLabelChange} />
        </form>
      );
    }
    return null;
  }
}

TodoItemInputForm.defaultProps = {
  edited: false,
};

TodoItemInputForm.propTypes = {
  id: PropTypes.number.isRequired,
  label: PropTypes.string.isRequired,
  edited: PropTypes.bool,
  editItem: PropTypes.func.isRequired,
};
