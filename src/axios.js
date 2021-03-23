import axios from 'axios'

const instance =axios.create({
    baseURL: 'https://delicious-62109.firebaseio.com/'
})

export default instance;