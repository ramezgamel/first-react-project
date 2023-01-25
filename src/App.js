import React, { useState, useReducer } from "react";
import Task from "./components/Task"
import "./App.css"

export const ACTIONS = {
  ADD_TASK: "addTask",
  DELETE_TASK: "deleteTask",
  TOGGLE_TASK: "completeTask"
}

function reducer(todos, action){ 
  switch (action.type) {
    case ACTIONS.ADD_TASK:
      return [...todos, action.payload]
    case ACTIONS.TOGGLE_TASK:
      return todos.map((todo => {
        if(todo.id === action.payload.id) {
          return {...todo, complete: !todo.complete}
        }
        return todo
      }))
    case ACTIONS.DELETE_TASK:
      return todos.filter( todo => todo.id !== action.payload.id )
    default:
      return todos
  }
}


function App () {
  const [todo, dispatch] = useReducer(reducer, []);
  const [task, setTask] = useState({
    name: "",
    id: Date,
    complete: Boolean
  })

  function handleSubmit(e){
    e.preventDefault()
    dispatch({type: ACTIONS.ADD_TASK, payload: task})
    setTask({name:""})
  }


    return (
      <div className="App">
        <form onSubmit={handleSubmit}>
          <input type="text" value={task.name} onChange={(e) => setTask({name: e.target.value, id: Date.now(), complete: false})}/>
          <span onClick={handleSubmit}>+</span>
        </form>
          {todo.length? 
            todo.map((todo) => {
              return (
                <Task key={todo.id} todo={todo} dispatch={dispatch}/>
              )
              }) 
            : <div className="noTasks">No Tasks to Show</div>
          }
        <div className="task-info">
          <div className="active-task">
            Tasks
            <span>{todo.length}</span>
          </div>
          <div className="completed-task">
            Completed
            <span>
              {todo.reduce((acc, cur) => {
                if(cur.complete) {
                  return acc +1 
                }
                return acc
              }, 0)}
            </span>
          </div>
        </div>
      </div>
    )
}
export default App;
