import { useState, useEffect } from 'react'
import { getPersons } from './services/phonebook'
import AddPersonForm from './components/AddPersonForm'
import Filter from './components/Filter'
import Notification from './components/Notification'
import NumbersTable from './components/NumbersTable'
import "./index.css"

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