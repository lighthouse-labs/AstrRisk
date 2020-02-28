const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const api = require("./lib/api.js");

app.use(cors());

app.use(routes(api));

app.listen(3001, () => console.log("API Server listening on port 3001"));
