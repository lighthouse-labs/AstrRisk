const express = require("express");
const router = express.Router();
const fs = require("fs");
const moment = require("moment");

module.exports = API => {
  // Serves JSON for requested date
  router.get("/api/neo/:date", (req, res) => {
    const date = req.params.date;
    API.getNeoData(date)
      .then(data => {
        res.json(JSON.parse(data));
      })
      .catch(err => {
        res.status(404).send(`Error retrieving records for ${date}`);
      });
  });

  // Retrieves annual data for specified year
  router.get("/api/annual/:year", (req, res) => {
    const year = req.params.year;
    API.getAnnualData(year)
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        res.status(404).send(`Error retrieving records for ${year}`);
      });
  });

  //Retrieves fireball data from file
  router.get("/api/fireball", (req, res) => {
    API.getFireballData()
      .then(data => {
        res.json(data);
      })
      .catch(err => {
        console.log("Error retrieving fireball data", err);
        res.status(404).send("Error retrieving fireball data");
      });
  });

  return router;
};
