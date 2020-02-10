const fs = require("fs");
const moment = require("moment");

module.exports = {
  getNeoData: date => {
    const year = moment(date).format("YYYY");
    return new Promise((resolve, reject) => {
      fs.readFile(`./json/${year}/${date}.json`, (err, data) => {
        if (data !== undefined) {
          console.log(`Data access request for ${date}`);
          resolve(data);
        } else {
          reject(err);
        }
      });
    });
  },

  getAnnualData: rawYear => {
    const year = moment(rawYear).format("YYYY");
    return new Promise((resolve, reject) => {
      fs.readFile(`./json/${year}/${year}.json`, (err, data) => {
        if (data !== undefined) {
          console.log(`Annual data access request for ${year}`);
          const annualData = JSON.parse(data);

          // Creates array for d3 to generate graphs from
          let dailyNeoCount = [];
          for (let dataDate in annualData) {
            const dayOfYear = moment(dataDate).dayOfYear();
            const length = annualData[dataDate].length;
            dailyNeoCount.push({
              date: dataDate,
              month: Number(moment(dataDate).format("MM")),
              day: Number(moment(dataDate).format("DD")),
              dayOfYear: dayOfYear,
              value: length
            });
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

          resolve(dailyNeoCount);
        } else {
          reject(err);
        }
      });
    });
  },

  getFireballData: () => {
    return new Promise((resolve, reject) => {
      fs.readFile("./json/nasa-fireball-new.json", (err, data) => {
        if (data !== undefined) {
          console.log("Fireball Data accessed");
          resolve(JSON.parse(data));
        } else {
          reject(err);
        }
      });
    });
  }
};
