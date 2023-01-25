import React, { useState, useReducer, useRef, useEffect } from "react";
import Task from "./components/Task";
import "./App.css";

export const ACTIONS = {
  ADD_TASK: "addTask",
  DELETE_TASK: "deleteTask",
  TOGGLE_TASK: "completeTask",
  GET_TASKS_FROM_STORAGE: "getTasksFromStorage",
};

const LOCAL_STORAGE_KEY = "todos";

function reducer(todos, action) {
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...todos, action.payload];
    case ACTIONS.TOGGLE_TASK:
      return todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return { ...todo, complete: !todo.complete };
        }
        return todo;
      });
    case ACTIONS.DELETE_TASK:
      return todos.filter((todo) => todo.id !== action.payload.id);
    case ACTIONS.GET_TASKS_FROM_STORAGE:
      console.log("todosReducer", todos);
      console.log("reducer", action.payload.todos);
      return [...action.payload.todos];
    default:
      return todos;
  }
}

function App() {
  const [todo, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState({
    name: "",
    id: Date,
    complete: Boolean,
  });

  const inputEle = useRef();

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    dispatch({ type: ACTIONS.GET_TASKS_FROM_STORAGE, payload: { todos } });
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todo));
    console.log("todo", todo);
  }, [todo]);

  function handleSubmit(e) {
    e.preventDefault();
    if (inputEle.current.value === "") return;
    dispatch({ type: ACTIONS.ADD_TASK, payload: task });
    inputEle.current.value = "";
  }

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          ref={inputEle}
          type="text"
          onChange={(e) =>
            setTask({ name: e.target.value, id: Date.now(), complete: false })
          }
        />
        <span onClick={handleSubmit}>+</span>
      </form>
      {todo.length ? (
        todo.map((todo) => {
          return <Task key={todo.id} todo={todo} dispatch={dispatch} />;
        })
      ) : (
        <div className="noTasks">No Tasks to Show</div>
      )}
      <div className="task-info">
        <div className="active-task">
          Tasks
          <span>{todo.length}</span>
        </div>
        <div className="completed-task">
          Completed
          <span>
            {todo.reduce((acc, cur) => {
              if (cur.complete) {
                return acc + 1;
              }
              return acc;
            }, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}
export default App;
