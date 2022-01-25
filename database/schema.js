const mongoose = require('mongoose');

const artSchema = new mongoose.Schema(
  {
    user: String,
    email: String,
    ascii: String,
  },
  {
    timestamps: true,
  }
);

const Art = mongoose.model('Art', artSchema);

module.exports = { Art };
