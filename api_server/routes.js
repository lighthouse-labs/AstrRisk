const express = require('express');
const router = express.Router();
const fs = require('fs');

module.exports = () => {

  // Servers JSON for requested date
  router.get("/api/:date", (req, res) => {
    const date = req.params.date;
    try {
      fs.readFile(`./json/${date}/${date}.json`, (err, data) => {
        if (!err) { // console.log('ERROR', err)
          console.log("DATA ACCESSED")
          res.json(JSON.parse(data));
        }
      })
    } catch (err) {
      console.log('ERROR', err);
    }
  });

  return router
}