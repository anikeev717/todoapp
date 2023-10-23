import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './new-todo-item.css';

export class NewTodoItem extends Component {
  state = { label: '', time: { min: '30', sec: '' } };

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    });
  };

  onTimerChange = (e, timeUnit) => {
    const { time: oldTime } = this.state;
    const newTime = JSON.parse(JSON.stringify(oldTime));
    const reg = /^0+|(^6[1-9])|(^[7-9]\d)|[^\d]/gm;
    // const reg = timeUnit === 'min' ? /^0+|(^6[1-9])|(^[7-9]\d)|[^\d]/gm : /^0+|(^[6-9]\d)|[^\d]/gm;
    const newTimeValue = e.target.value.replace(reg, '').slice(0, 2);
    newTime[timeUnit] = newTimeValue;
    this.setState({
      time: newTime,
    });
  };

  onSubmit = (e) => {
    const {
      label,
      time: { min, sec },
    } = this.state;
    const { onItemAdded } = this.props;
    const newLabel = label.replace(/\s+/g, ' ').trim();
    const newTime = Number(min) * 60 + Number(sec);
    e.preventDefault();
    if (newLabel && newTime) {
      onItemAdded(newLabel, newTime);
      this.setState({ label: '', time: { min: '', sec: '' } });
    }
  };

  onKeyEnter = (e) => {
    if (e.key === 'Enter') this.onSubmit(e);
  };

  render() {
    const {
      label,
      time: { min, sec },
    } = this.state;

    return (
      <form className="header" onSubmit={this.onSubmit}>
        <h1>todos</h1>
        <input
          className="new-todo"
          placeholder="What needs to be done?"
          onKeyDown={this.onKeyEnter}
          onChange={this.onLabelChange}
          value={label}
        />
        <input
          className="new-todo new-todo-timer"
          placeholder="Min"
          onKeyDown={this.onKeyEnter}
          onChange={(e) => {
            this.onTimerChange(e, 'min');
          }}
          value={min}
        />
        <input
          className="new-todo new-todo-timer"
          placeholder="Sec"
          onKeyDown={this.onKeyEnter}
          onChange={(e) => {
            this.onTimerChange(e, 'sec');
          }}
          value={sec}
        />
      </form>
    );
  }
}

NewTodoItem.propTypes = {
  onItemAdded: PropTypes.func.isRequired,
};
