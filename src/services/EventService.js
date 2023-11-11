import axios from 'axios'

// single axios instance for reuse
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Real-World_Vue-3',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  getEvents() {
    // /events added onto baseURL
    return apiClient.get('/events')
  },
  getEvent(id) {
    // /events added onto baseURL
    return apiClient.get(`/events/${id}`)
  }
}
