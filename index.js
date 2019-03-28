const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
const compression = require("compression");
const sslRedirect = require("heroku-ssl-redirect");
require("dotenv").config();

const IS_PROD = process.env.NODE_ENV === "production";
app.use(morgan(IS_PROD ? "combined" : "dev"));

if (IS_PROD) {
  app.use(sslRedirect());
  app.use(compression());
}

app.use(express.static(path.join(__dirname, "client/dist/project-crypto/")));

const api = require("./server/routes/api");
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/project-crypto/index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
