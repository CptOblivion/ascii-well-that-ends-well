const mongoose = require('mongoose');
const { Art } = require('./schema.js')

async function submitArt(data) {
  const art = new Art({
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

async function init() {
  await mongoose.connect('mongodb://localhost:27017/asciiwell');
}

module.exports = {
  init,
  getAllArt,
  submitArt,
}