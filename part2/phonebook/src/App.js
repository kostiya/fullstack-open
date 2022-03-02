import { useState, useEffect } from 'react'
import axios from 'axios'

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

const AddPersonForm = ({newName,setNewName,newNumber,setNewNumber,persons,setPersons}) => {
  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addPerson = (event) => {
    event.preventDefault()
    for (const person of persons){
      if(newName === person.name){
        window.alert(`${newName} is already added to phonebook`)
        setNewName('')
        return
      }
    }
    const newPerson = {
      name : newName,
      number : newNumber
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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

const NumbersTable = ({persons,filter}) => (
  <table>
    <tbody>
      {persons
      .filter(person => person.name.toLowerCase()
      .includes(filter.toLowerCase()))
      .map((person) =>  
        <tr key={person.name}>
          <td>{person.name}</td>
          <td>{person.number}</td>
        </tr>)}
    </tbody>
  </table>
)

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons')
      .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />
      <h2>Add new</h2>
      <AddPersonForm newName={newName} 
                    setNewName={setNewName}
                    newNumber={newNumber}
                    setNewNumber={setNewNumber}
                    persons={persons}
                    setPersons={setPersons} />
      <h2>Numbers</h2>
      <NumbersTable persons={persons} filter={filter} />
    </div>
  )
}

export default App