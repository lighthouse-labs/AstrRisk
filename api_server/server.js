const express = require('express');
const app = express();
const path = require('path');
const routes = require('./routes');
const cors = require('cors');

app.use(express.static("public"));
app.use(cors());

app.use(routes());

app.listen(3001, () => console.log('Example app listening on port 3001!'))