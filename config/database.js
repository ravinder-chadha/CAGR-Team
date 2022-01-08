const mongoose = require("mongoose");

const MONGO_URI  = "mongodb+srv://root:x1Y8AvX2AMdIdqLY@cluster0.1wss4.mongodb.net/hack?retryWrites=true&w=majority";

exports.connect = () => {
  // Connecting to the database
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
     
    })
    .then(() => {
      console.log("Successfully connected to database");
    })
    .catch((error) => {
      console.log("database connection failed. exiting now...");
      console.error(error);
      process.exit(1);
    });
};