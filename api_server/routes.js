const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');

module.exports = () => {

  // Servers JSON for requested date
  router.get("/api/neo/:date", (req, res) => {
    const date = req.params.date;
    const year = moment(date).format('YYYY');
    try {
      fs.readFile(`./json/${year}/${date}.json`, (err, data) => {
        if (data !== undefined) {
          console.log(`Data access request for ${date}`);
          res.json(JSON.parse(data));
        } else {
          res.status(404).send(`Error retrieving records for ${date}`);
        }
      })
    } catch (err) {
      console.log('ERROR', err);
    }
  });

  router.get('/api/fireball', (req, res) => {
    try {
      fs.readFile('./json/nasa-fireball-new.json', (err, data) => {
        if (data !== undefined) {
          console.log('Fireball Data accessed')
          res.json(JSON.parse(data));
        } else {
          res.status(404).send("Error retrieving fireball data");
        }
      })
    } catch (err) {
      console.log('Error retrieving fireball data', err);
    }
  })

  return router
}