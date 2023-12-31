const { connect } = require('mongoose')


const connectDB = async () => {
  try {
    const db = await connect(process.env.DB_HOST);
    console.log(
      `Data base is connected. Name: ${db.connection.name}. Port: ${db.connection.port}. Host: ${db.connection.host}`);
  } catch (error) {
      console.log(error.message)
      process.exit(1)
  }
};

module.exports = connectDB;
