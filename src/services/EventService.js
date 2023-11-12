import axios from 'axios'

// single axios instance for reuse
const apiClient = axios.create({
  baseURL: 'https://my-json-server.typicode.com/Code-Pop/Touring-Vue-Router',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

export default {
  // events to return per page, page we are on
  getEvents(perPage, page) {
    // /events added onto baseURL
    return apiClient.get(`/events?_limit=${perPage}&_page=${page}`)
  },
  getEvent(id) {
    // /events added onto baseURL
    return apiClient.get(`/events/${id}`)
  }
}
