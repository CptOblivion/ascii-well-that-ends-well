import axios from 'axios'

export function getAllArt() {
  return axios.get('/art')
    .then(response => response.data)
}

export function postArt(body) {
  console.log('sending')
  return axios.post('/art', body)
    .then(() => console.log('sent'))
}