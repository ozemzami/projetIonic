const express = require("express");
const bodyParser = require("body-parser");
const symptoms = require("./symptoms.json");
const risk = require("./risk_factors.json");
const conditions = require("./conditions.json");
require("colors");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

app.post("/symptoms", (req, res, next) => {
  console.log("REQUEST".magenta, req.body);
  let symptom = req.body.symptom;
  let result = undefined;
  for (let i = 0; i < symptoms.length; i++) {
    if (symptoms[i].name == symptom) {
      result = symptoms[i].id;
    }
  }
  if (result == undefined) {
    res.status(404).json({
      error: "symptom not found"
    });
  } else {
    res.status(200).json({
      id: result
    });
  }
});
app.get("/risk-factors", (req, res, next) => {
  res.status(200).send(risk);
});
app.get("/conditions", (req, res, next) => {
  res.status(200).send(conditions);
});

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
