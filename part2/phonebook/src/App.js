import { useState } from 'react'

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
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

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