const express = require('express');

const cors = require("cors");
const app = express();

const usersRouter = require('./router/usersRouter')

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello lllolojj!');
});

app.use('/api/users', usersRouter)


app.use((req, res) => {
  res.status(404).json({ message: "Not found bbdbdbdb" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  }); 
});

module.exports = app