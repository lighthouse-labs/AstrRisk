const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const path = require('path');
const PORT = 3000;

app.use(compression());

app.use(express.static(path.join(__dirname)));

app.use('/api', proxy({
  target: 'http://localhost:3001',
}));

app.listen(`${PORT}`, () => {
  console.log(`App running on port ${PORT}`);
});
