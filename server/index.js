const express = require('express');
const { init, getAllArt, submitArt } = require('../database');
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/art', async (req, res) => {
  try {
    const art = await getAllArt();
    res.send(art);
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to retrieve art');
  }
});

app.post('/art', async (req, res) => {
  //TODO: validation
  try {
    await submitArt(req.body);
    res.status(201).send();
  } catch (err) {
    console.error(err);
    res.status(500).send('Unable to store art');
  }
});

app.use(express.static('./client/dist'));

init().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
});
