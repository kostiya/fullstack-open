import { deletePerson } from '../services/phonebook'

export default ({persons, setPersons, filter}) => {
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