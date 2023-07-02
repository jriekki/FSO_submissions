import axios from 'axios'

const baseURL = '/api/persons'

const getAll = () => axios.get(baseURL).then(response => response.data)

const addPerson = newPerson => axios.post(baseURL, newPerson).then(response => response.data)

const deletePerson = id => axios.delete(`${baseURL}/${id}`)

const updatePerson = (id, personObject) => axios.put(`${baseURL}/${id}`,personObject).then(response => response.data)

export default { getAll, addPerson, deletePerson,updatePerson }