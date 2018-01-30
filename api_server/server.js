const express = require('express');
const app = express();
const path = require('path');
const api = require('./api');
const routes = require('./routes');

app.use(express.static("public"));

app.use(routes());

app.listen(3001, () => console.log('Example app listening on port 3000!'))