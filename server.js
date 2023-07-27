const { connectMongo } = require("./db/connectMongo");
require("dotenv").config();

const app = require('./app');
const { PORT = 3000} = process.env;

const start = async () => {
  try {
    await connectMongo();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });
};

start();