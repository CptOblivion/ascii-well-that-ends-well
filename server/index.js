const express = require('express');
const db = require('../database');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.use(express.static('./client/dist'));

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
