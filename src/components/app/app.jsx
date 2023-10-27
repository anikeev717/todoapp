import React, { Component } from 'react';

import './app.css';
import { TodoList } from '../todo-list/todo-list';
import { NewTodoItem } from '../new-todo-item/new-todo-item';
import { Footer } from '../footer/footer';

export class App extends Component {
  static timerTimeCalculator = (oldTimerTime, newTimerMark, oldTimerMark) => {
    const timeMarkDifference = newTimerMark - oldTimerMark;
    const newTimerTime = oldTimerTime - timeMarkDifference;
    return newTimerTime < 0 ? 0 : newTimerTime;
  };

  state = {
    todoData: [],
    filterName: 'all',
    timerInProgress: false,
  };

  id = 0;

  static onToggled = (arr, id, propName, labelNewValue) => {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      label: labelNewValue || oldItem.label,
    };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  static onFilter = (todos, filterName) => {
    switch (filterName) {
      case 'active':
        return todos.filter((e) => !e.completed);
      case 'completed':
        return todos.filter((e) => e.completed);
      default:
        return todos;
    }
  };

  onCompleted = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: App.onToggled(todoData, id, 'completed'),
      };
    });
  };

  onEdited = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: App.onToggled(todoData, id, 'edited'),
      };
    });
  };

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const index = todoData.findIndex((e) => e.id === id);
      const todoDataFresh = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
      return { todoData: todoDataFresh };
    });
  };

  addItem = (text, time) => {
    const newItem = this.createItem(text, time);
    this.setState(({ todoData }) => {
      const todoDataFresh = [...todoData.slice(), newItem];
      return { todoData: todoDataFresh };
    });
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const todoDataFresh = [...todoData.filter((e) => !e.completed || e.edited)];
      return { todoData: todoDataFresh };
    });
  };

  editItem = (id, value) => {
    this.setState(({ todoData }) => {
      return {
        todoData: App.onToggled(todoData, id, 'edited', value),
      };
    });
  };

  createItem = (label, timerTime) => {
    this.id += 1;
    return {
      label,
      timerTime,
      timerId: 0,
      completed: false,
      edited: false,
      id: this.id,
      createdDate: new Date(),
      timerMark: 0,
    };
  };

  onFilterChange = (filterName) => {
    this.setState({ filterName });
  };

  onTick = (id, propName) => {
    const { todoData } = this.state;
    const index = todoData.findIndex((el) => el.id === id);
    const oldItem = todoData[index];
    const needStatus = propName === 'timerTime';
    let newItem;

    if (!!oldItem[propName] === needStatus) {
      const newTimerMark = Math.floor(new Date().getTime() / 1000);
      const propValue = needStatus
        ? App.timerTimeCalculator(oldItem[propName], newTimerMark, oldItem.timerMark)
        : setInterval(() => this.onTick(id, 'timerTime'), 1000);

      newItem = {
        ...oldItem,
        [propName]: propValue,
        timerMark: newTimerMark,
      };
    } else {
      clearInterval(oldItem.timerId);
      newItem = {
        ...oldItem,
        timerId: 0,
        completed: needStatus,
      };
      this.setState({ timerInProgress: false });
    }
    this.setState(() => ({
      todoData: [...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)],
    }));
  };

  onTimerOn = (id) => {
    this.setState((prev) => ({
      timerInProgress: !prev.timerInProgress,
    }));
    this.onTick(id, 'timerId');
  };

  render() {
    const { todoData, filterName, timerInProgress } = this.state;
    const visibleData = App.onFilter(todoData, filterName);
    const activeCount = todoData.filter((e) => !e.completed).length;

    return (
      <div className="todoapp">
        <NewTodoItem onItemAdded={this.addItem} />
        <TodoList
          todos={visibleData}
          onCompleted={this.onCompleted}
          onDeleted={this.deleteItem}
          onEdited={this.onEdited}
          editItem={this.editItem}
          onTimerOn={this.onTimerOn}
          timerInProgress={timerInProgress}
        />
        <Footer
          todoLeft={activeCount}
          onClearCompleted={this.clearCompleted}
          filterName={filterName}
          onFilterChange={this.onFilterChange}
        />
      </div>
    );
  }
}
