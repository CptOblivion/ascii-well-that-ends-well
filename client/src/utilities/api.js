import axios from 'axios'

export function getAllArt() {
  return axios.get('/art')
    .then(response => response.data)
}

export function postArt(body) {
  return axios.post('/art', body)
}

export function deleteArt(art_id) {
  return axios.delete(`/art?art_id=${art_id}`)
}