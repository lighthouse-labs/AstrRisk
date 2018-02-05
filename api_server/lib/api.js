const fs = require('fs');
const moment = require('moment');

module.exports = {
  getAnnualData: (year) => {
    // return module.exports.findData(year);      
    let findData = new Promise((resolve, reject) => {
      return resolve(module.exports.getData(year))
    });

    return findData


  },

  getData: (year) => {
    try {
      fs.readFile(`./json/${year}/${year}.json`, (err, data) => {
        if (data !== undefined) {
          console.log(`Annual data access request for ${year}`);
          const annualData = JSON.parse(data);

          // Creates array for d3 to generate data from
          let dailyNeoCount = [];
          for (let date in annualData) {
            const dayOfYear = moment(date).dayOfYear();
            if (dayOfYear % 30 !== 0) {
              const length = annualData[date].length
              dailyNeoCount.push({ length: length, dayOfYear: dayOfYear });
            }
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

          return dailyNeoCount;

        } else {
          res.status(404).send(`Error retrieving records for ${year}`);
        }
      })
    } catch (err) {
      console.log('ERROR', err);
    }
  }

}