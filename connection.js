const mongoose = require("mongoose");

async function connectDb(url) {
  return mongoose
    .connect(url)
    .then(() => console.log("MongoDB connected successfully!"))
    .catch((err) => console.log("Error Occured:", err));
}

module.exports = {
  connectDb,
};
