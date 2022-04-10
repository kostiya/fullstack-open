import axios from "axios"
const baseURL = "/api/persons"

export const getPersons = (setPersons) => {
    return axios.get(baseURL).then(response => setPersons(response.data))
}

export const postPerson = (newPerson,setPersons,persons) => {
    return axios.post(baseURL,newPerson).then(response => setPersons(persons.concat(response.data))
    )
}

export const deletePerson = (id, setPersons, persons) => {
    return axios.delete(`${baseURL}/${id}`).then(setPersons(persons.filter(person => person.id !== id)))
}

export const putPerson = (id, newPerson, setPersons, persons, setMessage, setMessageClass) => {
    return (axios
    .put(`${baseURL}/${id}`, newPerson)
    .then(()=> {
        setPersons(persons.map(person => person.id === id ? {...newPerson, id : id} : person))
        setMessageClass("addedPerson")
        setMessage("Updated " + newPerson.name + " number.")
        setTimeout(() => {
            setMessage(null)
        }, 5000)
    })
    )
    .catch(
        () => {
            setMessageClass("alreadyDeletedPerson")
            setMessage("Information of " + newPerson.name + " has already been remooved from the server.")
            setTimeout(() => {
                setMessage(null)
            }, 5000)
            setPersons(persons.filter(person => person.id !== id))
            return
    })
}