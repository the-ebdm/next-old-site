const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");
const app = express();
const admin = require("../lib/admin");
const db = admin.firestore();

app.use(bodyParser.json({ limit: "200mb" }));
app.use((req, res, next) => {
  console.log(req.path);
  next();
});

app.listen(8081, () => {
  console.log(`Listening on http://localhost:8081`);
});