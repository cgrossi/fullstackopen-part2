import axios from 'axios'
const baseURL = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseURL)
}

const addContact = newObj => {
  return axios.post(baseURL, newObj)
}

const updateContact = (id, newObj) => {
  return axios.put(`${baseURL}/${id}`, newObj)
}

const deleteContact = id => {
  return axios.delete(`${baseURL}/${id}`)
}

export default {
  getAll,
  addContact,
  updateContact,
  deleteContact
}