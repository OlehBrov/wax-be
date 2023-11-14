const express = require("express");
const app = require('./app')
const connectDB = require("./config/db_connect");
const path = require("path");
// const { httpError } = require("./helpers");
// const configPath = path.join(__dirname, "config", ".env");
require("dotenv").config();
const { PORT } = process.env;


app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json());


// app.use(httpError);

connectDB();
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

