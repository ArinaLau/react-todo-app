import React, { useRef } from 'react'
import { ACTIONS } from './App'

export default function Todo({ todo, dispatch }) {
   const inputRef = useRef()

    return (
        todo.isInEditMode ?
        <div className="todo-list-section">
            <input className="todo-toggle" type="checkbox" disabled/>

            <input 
                className="todo-input"
                type="text" 
                defaultValue={todo.name}
                ref={inputRef}
            />

            <button className="btn btn-edit" onClick={() => {
                  dispatch({ type: ACTIONS.EXIT_EDIT , payload: { id: todo.id, name: inputRef.current.value }})
              }}>OK</button>
            
            <button className="btn btn-remove" onClick={() => {
                  dispatch({ type: ACTIONS.EDIT_TODO , payload: { id: todo.id }})
              }}>Cancel</button>
 
        </div> :
        <div className="todo-list-section">
              <input className="todo-toggle" type="checkbox" onChange={() => {
                    dispatch({ type: ACTIONS.TOGGLE_TODO , payload: { id: todo.id }})
                }} />

              <p className={`todo${todo.complete ? ' done' : '' }`} >{todo.name}</p>

              <button className="btn btn-edit" onClick={() => {
                  dispatch({ type: ACTIONS.EDIT_TODO , payload: { id: todo.id }})
              }}>Edit</button>
              
              <button className="btn btn-remove" onClick={() => {
                    dispatch({ type: ACTIONS.DELETE_TODO , payload: { id: todo.id }})
              }}>Remove</button>
          </div>
    )
}
