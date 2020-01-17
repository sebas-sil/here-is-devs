import axios from 'axios'

const api = axios.create({
    baseURL: 'http://172.25.2.226:3333'
})

export default api