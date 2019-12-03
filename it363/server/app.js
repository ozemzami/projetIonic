const express = require("express");
const bodyParser = require("body-parser");
const symptoms = require('./symptoms.json');
const risk = require('./risk_factors.json');
const conditions = require('./conditions.json');
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

app.get('/symptoms', (req, res, next) => {
  let symptom = req.body.symptom;
  for(let i = 0; i < symptoms.length; i++) {
    if(symptoms[i].name == symptom) {
      res.status(200).json({
        id: symptoms[i].id
      });
    }
  }
  //res.status(500).send("error");
});
app.get('/ris-factors', (req, res, next) => {
  res.status(200).send(risk);
});
app.get('/conditions', (req, res, next) => {
  res.status(200).send(conditions);
})

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
