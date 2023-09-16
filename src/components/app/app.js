import React, { Component } from 'react';

import './app.css';
import TodoList from '../todo-list';
import NewTodoItem from '../new-todo-item';
import Footer from '../footer';

export default class App extends Component {
  constructor() {
    super();
    this.id = 0;
    this.createItem = (label) => {
      this.id += 1;
      return {
        label,
        completed: false,
        edited: false,
        id: this.id,
        createdDate: new Date(),
      };
    };
    this.state = {
      todoData: [],
      filterName: 'all',
    };
    this.onToggled = (arr, id, propName, labelNewValue) => {
      const index = arr.findIndex((el) => el.id === id);
      const oldItem = arr[index];
      const newItem = {
        ...oldItem,
        [propName]: !oldItem[propName],
        label: labelNewValue || oldItem.label,
      };
      return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
    };
    this.onCompleted = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.onToggled(todoData, id, 'completed'),
        };
      });
    };
    this.onEdited = (id) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.onToggled(todoData, id, 'edited'),
        };
      });
    };

    this.editItem = (id, value) => {
      this.setState(({ todoData }) => {
        return {
          todoData: this.onToggled(todoData, id, 'edited', value),
        };
      });
    };

    this.deleteItem = (id) => {
      this.setState(({ todoData }) => {
        const index = todoData.findIndex((e) => e.id === id);
        const todoDataFresh = [...todoData.slice(0, index), ...todoData.slice(index + 1)];
        return { todoData: todoDataFresh };
      });
    };

    this.addItem = (text) => {
      const newItem = this.createItem(text);
      this.setState(({ todoData }) => {
        const todoDataFresh = [...todoData.slice(), newItem];
        return { todoData: todoDataFresh };
      });
    };

    this.clearCompleted = () => {
      this.setState(({ todoData }) => {
        const todoDataFresh = [...todoData.filter((e) => !e.completed)];
        return { todoData: todoDataFresh };
      });
    };

    this.onFilter = (todos, filterName) => {
      switch (filterName) {
        case 'active':
          return todos.filter((e) => !e.completed);
        case 'completed':
          return todos.filter((e) => e.completed);
        default:
          return todos;
      }
    };

    this.onFilterChange = (filterName) => {
      this.setState({ filterName });
    };
  }

  render() {
    const { todoData, filterName } = this.state;
    const visibleData = this.onFilter(todoData, filterName);
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
