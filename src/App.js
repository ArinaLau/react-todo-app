import React, { useState, useReducer, useEffect } from 'react';
import Todo from './Todo';

/*TO ADD  
//1. EDIT FUNCTION
//2. LOCAL STORAGE
XX3. NAVBAR - ACTIVE/COMPLETED/ALL
4. ALERT MESSAGE FOR EMPTY TODO
XX5. SEE THE DATE WHEN CREATED/LAST EDITED TODO
*/

export const ACTIONS = {
    ADD_TODO: 'add-todo',
    DELETE_TODO: 'delete-todo',
    TOGGLE_TODO: 'toggle-todo',
    EDIT_TODO: 'edit-todo',
    EXIT_EDIT: 'exit-edit'
}

const LOCAL_STORAGE_KEY = 'todoApp.todos';

//Initalising state of the component
const initialState = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))

function newTodo(name){
  return {id: Date.now(), name: name, complete:false, isInEditMode: false}
}

function reducer(todos, action){

    switch(action.type){

      case ACTIONS.ADD_TODO:
        if(todos){
          return [...todos, newTodo(action.payload.name)];
        }
        else
          return [todos, newTodo(action.payload.name)];
            

      case ACTIONS.TOGGLE_TODO:
        return todos.map(todo => {
            if(todo.id === action.payload.id){
                return {...todo, complete: !todo.complete}
            }
            return todo
        });

      case ACTIONS.DELETE_TODO:
          return todos.filter(todo => todo.id !== action.payload.id);
      
      case ACTIONS.EDIT_TODO:
        return todos.map((todo => {
          if(todo.id === action.payload.id){
            return {...todo, isInEditMode: !todo.isInEditMode}
          }
          return todo
      }));

      case ACTIONS.EXIT_EDIT:
        return todos.map((todo => {
          if(todo.id === action.payload.id){
            return {...todo, isInEditMode : false, name: action.payload.name}
          }
          return todo
      }));


      default:
        return todos;
    }
    
}

function App() {

  //initialize the reducer
  const [todos, dispatch] = useReducer(reducer, initialState)
  const [name, setName] = useState('')

  // listens for changes in the state, when changed it updates the localStorage value of name
	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
	}, [todos]);
  
  // let isAlertActive = false
  function handleSubmit(e){
    e.preventDefault()
    if(name === '') {
      return
    }
    dispatch({type: ACTIONS.ADD_TODO, payload: {name: name}})
    setName('')
  }

  return (
    <div className="todo-app-container">
          <div className="mb-4">
            <h1 className="header">React Todo App</h1>
    
            <div className="add-todo-section">
    
                <input className="todo-input" type="text" placeholder="Add Todo" value={name} onChange={e => setName(e.target.value)} />
    
                <button className="btn btn-add" onClick={handleSubmit}>Add</button>
            </div>
            
          </div>
          {/* <div role="alert" className={`alert-section${isAlertActive ? '' : ' active'}`}>
                <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
                  Danger
                </div>
                <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
                  <p>Something not ideal might be happening.</p>
                </div>
            </div> */}
            
          <div>{todos.map(todo => {
            return <Todo key={todo.id} todo={todo} dispatch={dispatch} />
          })}</div>
    
        </div>
  );
}

export default App;
