const express = require('express');

const cors = require("cors");
const app = express();

const usersRouter = require('./router/usersRouter')
const ordersRouter = require('./router/ordersRouter')

app.use(cors());
app.use(express.json());


app.use('/api/users', usersRouter)
app.use('/api/orders', ordersRouter)


app.use((req, res) => {
  res.status(404).json({ message: "Such page not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({
    message,
  }); 
});

module.exports = app