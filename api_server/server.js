const express = require("express");
const app = express();
const routes = require("./routes");
const cors = require("cors");
const api = require("./lib/api.js");
const PORT = process.env.NODE_ENV === "production" ? 3000 : 3000;

app.use(cors());

app.use(routes(api));

app.listen(PORT, () => console.log(`API Server listening on port ${PORT}`));
