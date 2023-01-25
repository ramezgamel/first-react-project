import React from 'react'
import "./Task.css"
import { ACTIONS } from '../App'

function Task ({todo, dispatch}) {
  
  return (
    <div className='tasks'>
      <span
        style={{ textDecoration: todo.complete ? "line-through" : "none" }}
        onClick={() => dispatch({ type: ACTIONS.TOGGLE_TASK, payload: { id: todo.id } })}>
          {todo.name}
      </span> 
      <button onClick={() => dispatch({ type: ACTIONS.DELETE_TASK, payload: { id: todo.id } })}>Delete</button>
    </div>
  )
}

export default Task