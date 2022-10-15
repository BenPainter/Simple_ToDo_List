import logo from './logo.svg';
import './App.css';
import React, {useState, useRef, useEffect } from 'react';
import TodoList from './TodoList'
import ElementList from './ElementList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'


function App() {
  const [todos, setTodos] = useState([])
  const [elements, setElements] = useState(['Hydrogen','Helium'])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(prevTodos =>[...prevTodos,...storedTodos]);
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])


  function toggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }

  function handleAddTodo(e) {
    const name = todoNameRef.current.value
    //const { v4: uuidv4 } = require('uuid');
    if (name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, complete: false}]
    })
    todoNameRef.current.value = null
  }

  function handleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  function handleClearAll() {
    const removeUnchecked = todos.filter(todo => todo.complete)
    const removeChecked = removeUnchecked.filter(todo => !todo.complete)
    setTodos(removeChecked)
  }

  
  function Time() {
    // setting up variables
    var date = new Date();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    var period = "";
    // AM vs PM
    if (hour >= 12) {
    period = "PM";
    } else {
    period = "AM";
    }
    // Looping it within 12 hours
    if (hour === 0) {
    hour = 12;
    } else {
    if (hour > 12) {
    hour = hour - 12;
    }
    }
    // Updating time
    hour = update(hour);
    minute = update(minute);
    second = update(second);

    document.getElementById('time').innerText = hour + " : " + minute + " : " + second + " " + period;
    setTimeout(Time, 1000);
   }
    // Function to update time elements if they are less than 10
    // Append 0 before time elements if they are less than 10
   function update(t) {
    if (t < 10) {
    return "0" + t;
    }
    else {
    return t;
    }
   }
   
   window.onload = function () {
    Time();
    }
   
   
  return (
    <>
    <body>
      <header>
        <h1 >The ToDo List</h1>
        <div id='time'>test</div>
        
      </header>
      <main>
        <input id='inputBar' ref={todoNameRef} type="text" />
        <button id = 'add' onClick={handleAddTodo}>Add Todo</button>
        <div></div>
        <button id='button' onClick={handleClearTodos}>Clear Completed</button>
        <button id='button' onClick={handleClearAll}>Clear all</button>
        <h2>{todos.filter(todo => !todo.complete).length} task left to do</h2>
        <div id='displayTodo'>
          <TodoList todos={todos} toggleTodo={toggleTodo}/>
        </div>
        
      </main>
    </body>
            {/* <ElementList elements={elements}/> */}
    </>
  )
  
}

export default App;
