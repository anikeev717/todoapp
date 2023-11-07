/* eslint-disable no-shadow */
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

import { TodoList } from '../todo-list/todo-list';
import { NewTodoItem } from '../new-todo-item/new-todo-item';
import { Footer } from '../footer/footer';
import { getTimerMark, getTimerTimeValue } from '../../services/get-timer-functions';
import { AppContext } from '../context/context';

import classes from './app.module.css';

export function App() {
  const [todoData, setTodoData] = useState([]);
  const [filterName, setFilterName] = useState('all');
  const [activeId, setActiveId] = useState(0);
  const refId = useRef(0);

  const onToggled = (arr, id, propName, labelNewValue) => {
    const index = arr.findIndex((el) => el.id === id);
    const oldItem = arr[index];
    const newItem = {
      ...oldItem,
      [propName]: !oldItem[propName],
      label: labelNewValue || oldItem.label,
    };
    return [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
  };

  const onFilter = (todoData, filterName) => {
    switch (filterName) {
      case 'active':
        return todoData.filter((e) => !e.completed);
      case 'completed':
        return todoData.filter((e) => e.completed);
      default:
        return todoData;
    }
  };

  const onCompleted = useCallback(
    (id) => {
      setTodoData(onToggled(todoData, id, 'completed'));
    },
    [todoData]
  );

  const onEdited = useCallback(
    (id) => {
      setTodoData(onToggled(todoData, id, 'edited'));
    },
    [todoData]
  );

  const onDeleted = (id) => {
    setTodoData((prev) => {
      const index = prev.findIndex((e) => e.id === id);
      const todoDataFresh = [...prev.slice(0, index), ...prev.slice(index + 1)];
      return todoDataFresh;
    });
  };

  const createItem = (label, timerTime) => {
    refId.current += 1;
    return {
      label,
      timerTime,
      completed: false,
      edited: false,
      id: refId.current,
      createdDate: new Date(),
    };
  };

  const addItem = (text, time) => {
    const newItem = createItem(text, time);
    setTodoData((prev) => {
      const todoDataFresh = [...prev.slice(), newItem];
      return todoDataFresh;
    });
  };

  const clearCompleted = () => {
    setTodoData((prev) => {
      const todoDataFresh = [...prev.filter((e) => !e.completed || e.edited)];
      return todoDataFresh;
    });
  };

  const editItem = useCallback(
    (id, value) => {
      setTodoData(onToggled(todoData, id, 'edited', value));
    },
    [todoData]
  );

  const onFilterChange = (filterName) => {
    setFilterName(filterName);
  };

  const onTimerOn = (id) =>
    setActiveId((prev) => {
      if (!prev) return id;
      return 0;
    });

  const visibleData = onFilter(todoData, filterName);
  const activeCount = todoData.filter((e) => !e.completed).length;

  useEffect(() => {
    const timerMark = getTimerMark();
    const interval = setInterval(() => {
      if (activeId) {
        const index = todoData.findIndex((el) => el.id === activeId);
        const oldItem = todoData[index];
        const { timerTime } = oldItem;
        const newItem = {
          ...oldItem,
          timerTime: getTimerTimeValue(timerTime, timerMark),
        };
        if (!timerTime) {
          setActiveId(0);
          newItem.completed = true;
        }
        setTodoData([...todoData.slice(0, index), newItem, ...todoData.slice(index + 1)]);
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [activeId, todoData]);

  const appContextValue = useMemo(
    () => ({
      onCompleted,
      onDeleted,
      onEdited,
      editItem,
      onTimerOn,
      filterName,
      onFilterChange,
    }),
    [editItem, filterName, onCompleted, onEdited]
  );
  return (
    <AppContext.Provider value={appContextValue}>
      <div className={classes.todoapp}>
        <NewTodoItem onItemAdded={addItem} />
        <TodoList todos={visibleData} activeId={activeId} />
        <Footer todoLeft={activeCount} onClearCompleted={clearCompleted} />
      </div>
    </AppContext.Provider>
  );
}
