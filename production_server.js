const express = require('express');
const app = express();
const proxy = require('http-proxy-middleware');
const compression = require('compression');
const path = require('path');
const PORT = 3000;
const PRODUCTION_ENV = process.env.NODE_ENV === 'production'
const target = PRODUCTION_ENV ? process.env.ASTRRISK_SERVER_DOMAIN : 'http://localhost:3001';

app.use(compression());

app.use(express.static(path.join(__dirname)));

app.use('/api', proxy({
  target,
  changeOrigin: PRODUCTION_ENV
}));

app.listen(`${PORT}`, () => {
  console.log(`App running on port ${PORT}`);
});
