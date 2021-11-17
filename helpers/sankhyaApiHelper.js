import axios from 'axios'

const sankhyaApiHelper = axios.create({
  baseURL: 'https://tudodebicho.gcloudlabs.com/mge',
  headers: {
    'Content-Type': 'application/xml'
  }
})

export default sankhyaApiHelper
