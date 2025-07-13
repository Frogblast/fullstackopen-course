import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request
}

const deleteContact = id => {
  const request = axios.delete(`${baseUrl}/${id}`)    
  return request
}

const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default {getAll, add, deleteContact, update}