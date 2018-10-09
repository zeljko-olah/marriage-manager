// DEFINE AXIOS INSTANCE
import axios from 'axios'

let url = process.env.NODE_ENV === 'development' ?
  'http://localhost:3231/' : 'https://vast-falls-59724.herokuapp.com/'

const instance = axios.create({
  baseURL: url,
  timeout: 3000,
})

export default instance