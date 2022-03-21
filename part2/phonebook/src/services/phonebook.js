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