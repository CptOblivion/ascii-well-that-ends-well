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
  await Art.find({});
}

async function init() {
  await mongoose.connect('mongodb://localhost:27017/asciiwell');
}

exports = {
  init,
  getAllArt,
  submitArt,
}