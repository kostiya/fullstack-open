import {postPerson, putPerson} from '../services/phonebook'

export default ({newName,setNewName,newNumber,setNewNumber,persons,setPersons,setMessage,setMessageClass}) => {
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
