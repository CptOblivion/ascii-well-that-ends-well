const express = require('express');
const { init, getAllArt, submitArt, deleteArt } = require('../database');
const port = 80;
const securePort = 443

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

app.delete('/art', async (req, res) => {
  if (!req.query.art_id) return res.status(400).send('Missing art_id!')
  try {
    await deleteArt(req.query.art_id)
    res.status(200).send();
  } catch (err) {
    console.error(err)
    res.status(500).send('Unable to remove art')
  }
})

app.use(express.static('./client/dist'));

init().then(() => {
  app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });
  app.listen(securePort, () => {
    console.log(`listening securely on port ${securePort}`)
  })
});
