const mongoose = require('mongoose');
const { Art } = require('./schema.js')

async function submitArt(data) {
  console.log(data)
  const art = new Art({
    title: data.tile,
    user: data.user,
    email: data.email,
    ascii: data.ascii
  })
  await art.save();
}

async function getAllArt() {
  const art = await Art.find({});
  return art;
}

function deleteArt(art_id) {
  return Art.deleteOne({_id: art_id})
}

async function init() {
  await mongoose.connect('mongodb://localhost:27017/asciiwell');
}

module.exports = {
  init,
  getAllArt,
  submitArt,
  deleteArt,
}