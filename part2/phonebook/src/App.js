import { useState, useEffect } from 'react'
import {getPersons, postPerson, deletePerson, putPerson} from './services/phonebook'
import "./index.css"

const Filter = ({filter, setFilter}) => {
  const handleFilterChange = (event) => setFilter(event.target.value)
  return(
  <div>
      filter shown with: <input 
                            value={filter}
                            onChange={handleFilterChange}/>

  </div>
  )
}

const AddPersonForm = ({newName,setNewName,newNumber,setNewNumber,persons,setPersons,setMessage,setMessageClass}) => {
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    const newPerson = {
      name : newName,
      number : newNumber
    }
    for (const person of persons){
      if(newName === person.name){
        const personID = person.id
        if(window.confirm(`${newName} is already added to phonebook.\n Replace older number with new one`)){
          putPerson(personID, newPerson, setPersons, persons, setMessage, setMessageClass)
        }
        setNewName('')
        setNewNumber('')
        return
      }
    }

    postPerson(newPerson, setPersons, persons)
    setMessage("Added " + newName + " to phonebook.")
    setMessageClass("addedPerson")
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    
    setNewName('')
    setNewNumber('')
    return
  }

  return(
    <form onSubmit={addPerson}>
      <div>
        name: <input 
                value={newName}
                onChange={handleNameChange}/>
        <br />
        number: <input 
                value={newNumber}
                onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const NumbersTable = ({persons, setPersons, filter}) => {
  const onDeleteClick = (person) =>(
    () => {
      if(window.confirm("Delete " + person.name + " ?")){
          return deletePerson(person.id, setPersons, persons)
      }
      return
    }
  )
  return(
  <table>
    <tbody>
      {persons
      .filter(person => person.name.toLowerCase()
      .includes(filter.toLowerCase()))
      .map((person) =>  
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
          <td><button onClick={onDeleteClick(person)}>delete</button></td>
        </tr>)}
    </tbody>
  </table>
  )
}

const Notification = ({message, messageClass}) => {
  if(message === null){
    return null
  }

  return(
    <div className={messageClass}>
      {message}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageClass, setMessageClass] = useState(null)

  useEffect(() => {
    getPersons(setPersons)
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} messageClass={messageClass}/>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <AddPersonForm newName={newName} 
                    setNewName={setNewName}
                    newNumber={newNumber}
                    setNewNumber={setNewNumber}
                    persons={persons}
                    setPersons={setPersons}
                    setMessage={setMessage}
                    setMessageClass={setMessageClass} />
      <h2>Numbers</h2>
      <NumbersTable persons={persons} setPersons={setPersons} filter={filter} />
    </div>
  )
}

export default App