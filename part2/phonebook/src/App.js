import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const handleNameChange = (event) => setNewName(event.target.value)

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
    }

    setPersons(persons.concat(newPerson))
    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input 
                  value={newName}
                  onChange={handleNameChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <table>
        <tbody>
          {persons.map((person) =>  <tr key={person.name}>
                                      <td>{person.name}</td>
                                    </tr>)}
        </tbody>
      </table>
    </div>
  )
}

export default App