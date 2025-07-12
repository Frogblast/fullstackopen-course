import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
  return axios.get(baseUrl)
}

const add = newPerson => {
  const request = axios.post(baseUrl, newPerson)
  return request
}

export default {getAll, add}