import axios from 'axios'

const precificaApiHelper = axios.create({
  baseURL: 'http://api.precifica.com.br',
  headers: {
    'Accept': 'application/vnd.api+json',
    'Content-Type': 'application/vnd.api+json'
  }
})

export default precificaApiHelper
