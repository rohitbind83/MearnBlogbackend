const mongoose = require("mongoose");

// Replace this with your MONGOURI.
const mongourl = "mongodb://127.0.0.1:27017/blog";

const InitiateMongoServer = async () => {
  try {
    await mongoose.connect(mongourl, {
      useNewUrlParser: true
    });
    console.log("Connected to DB !!");
  } catch (e) {
    console.log(e);
    throw e;
  }
};

module.exports = InitiateMongoServer;
