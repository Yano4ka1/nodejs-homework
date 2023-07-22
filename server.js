const { connectMongo } = require("./db/connectMongo");
require("dotenv").config();

const app = require('./app');

const start = async () => {
  try {
    await connectMongo();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }

  app.listen(3000, () => {
    console.log("Server running. Use our API on port: 3000");
  });
};

start();