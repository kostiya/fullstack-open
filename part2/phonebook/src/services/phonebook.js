import axios from "axios"
const baseURL = "http://localhost:3001/persons"

export const getPersons = (setPersons) => {
    return axios.get(baseURL)
           .then(response => setPersons(response.data))
}

export const postPerson = (newPerson,setPersons,persons) => {
    return axios.post(baseURL,newPerson).then(setPersons(persons.concat(newPerson))
    )
}

export const deletePerson = (id, setPersons, persons) => {
    return axios.delete(`${baseURL}/${id}`).then(setPersons(persons.filter(person => person.id !== id)))
}

export const putPerson = (id, newPerson, setPersons, persons) => {
    return axios.put(`${baseURL}/${id}`, newPerson)
        .then(setPersons(persons.map(person => person.id === id ? newPerson : person)))
}