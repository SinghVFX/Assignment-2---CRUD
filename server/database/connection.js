const mongoose = require("mongoose");

//This is a Node.js module that exports a single function named "connectDB" which connects to a MongoDB database using the mongoose library. The function is asynchronous and returns a promise. It first tries to connect to the database specified in the environment variable "MONGO_URI" using the "mongoose.connect" method with the necessary options for avoiding deprecation warnings. If the connection is successful, the function logs a message to the console indicating that the connection was established. Otherwise, if an error occurs during the connection process, the function logs the error to the console and exits the Node.js process with an exit code of 1. Finally, the function exports itself to be used by other modules in the application.//
const connectDB = async () => {
  try {
    const con = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
    });

    console.log(`MongoDB connected : ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
