import { useState } from 'react'

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

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)
  const handleFilterChange = (event) => setFilter(event.target.value)

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

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
      filter shown with: <input 
                  value={filter}
                  onChange={handleFilterChange}/>

      </div>
      <h2>Add new</h2>
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
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons
          .filter(person => person.name.toLowerCase().includes(filter.toLowerCase()))
          .map((person) =>  
            <tr key={person.name}>
              <td>{person.name}</td>
              <td>{person.number}</td>
            </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App