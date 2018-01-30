const express = require('express');
const router = express.Router();
const fs = require('fs');

module.exports = () => {

  // Servers JSON for requested date
  router.get("/api/:date", (req, res) => {
    const date = req.params.date;
    fs.readFile(`../${date}.json`, (err, data) => {
      if (err) throw err;
      res.json(JSON.parse(data));
    })
  });

  return router
}