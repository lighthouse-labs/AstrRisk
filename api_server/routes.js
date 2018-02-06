const express = require('express');
const router = express.Router();
const fs = require('fs');
const moment = require('moment');

module.exports = (API) => {

  // Serves JSON for requested date
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

  // Retrieves annual data for specified year
  router.get("/api/annual/:date", (req, res) => {
    const date = req.params.date;
    const year = moment(date).format('YYYY');
    // API.getAnnualData(year)
    //   .then(result => {
    //     console.log('result is: ', result);
    //     res.json(result);
    //   })
    //   .catch(err => console.log('Error', err))

    try {
      fs.readFile(`./json/${year}/${year}.json`, (err, data) => {
        if (data !== undefined) {
          console.log(`Annual data access request for ${year}`);
          // res.json(JSON.parse(data));
          const annualData = JSON.parse(data);

          // Creates array for d3 to generate data from
          let dailyNeoCount = [];
          for (let dataDate in annualData) {
            const dayOfYear = moment(dataDate).dayOfYear();
            // if (dayOfYear % 30 !== 0) {
              const length = annualData[dataDate].length
              dailyNeoCount.push({ length: length, dayOfYear: dayOfYear });
            // }
          }

          // Sorts array based on day of year
          dailyNeoCount.sort((a, b) => {
            const keyA = a.dayOfYear,
              keyB = b.dayOfYear;
            // Compare the 2 dates
            if (keyA < keyB) return -1;
            if (keyA > keyB) return 1;
            return 0;
          });

          res.json(dailyNeoCount);

        } else {
          res.status(404).send(`Error retrieving records for ${year}`);
        }
      })
    } catch (err) {
      console.log('ERROR', err);
    }
  });

  //Retrieves fireball data from file
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