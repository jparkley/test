import { useState } from 'react'
import './App.css';

function App() {

  const [state, setState] = useState({
    toDo: '',
    toDos: [] /* {name: String, completed: false} */
  })

  const handleSubmit = (e) => {    
    e.preventDefault()
    if (!state.toDo) return

    setState(prev => {
      return {
        toDos: [...prev.toDos, {name: state.toDo, completed: false}],
        toDo: ''
      }
    })
  }

  const toggleCompleted = (index) => {
    setState(prev => {
      let updatedToDos = prev.toDos.map((toDo, i) => {
        if(i === index) { return {...toDo, completed: !toDo.completed}}
        return toDo
      })
      return {...prev, toDos: updatedToDos}
    })
  }

  return (
    <div className="container">
      <div className="container-header">
        <h2 className="title">To Do List</h2>
      </div>
      <div className="container-body">
        <form action="" onSubmit={handleSubmit}>
          <input type="text" name="toDo" placeholder="Enter task here ..."
            value={state.toDo} onChange={e => setState({...state, toDo: e.target.value})}
          />
          <button type="button" onClick={handleSubmit}>Add</button>
        </form>
        <div className="list-wrapper">
          <ul>
            {state.toDos && state.toDos.map((toDo, index) => (
              <li key={index} onClick={() => toggleCompleted(index)} 
                className={toDo.completed ? 'completed' : ''}
              >{capitalize(toDo.name)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

function capitalize(str) {
  if (!str) return
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export default App;
