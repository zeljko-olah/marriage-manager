import axios from 'axios'

let url = process.env.NODE_ENV === 'development' ?
  'http://localhost:3231/' : ''

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
})

export default instance