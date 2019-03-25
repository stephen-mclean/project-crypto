const express = require("express");
const app = express();
const path = require("path");
const morgan = require("morgan");
require("dotenv").config();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));

app.use(express.static(path.join(__dirname, "client/dist/project-crypto/")));

const api = require("./server/routes/api");
app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/client/dist/project-crypto/index.html"));
});

app.listen(process.env.PORT || 5000, () => console.log("Server started"));
