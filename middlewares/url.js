const fs = require("fs");

function logDetails(fileName) {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `${Date.now()} : ${req.method} : ${req.path}, IP: ${req.ip} \n`,
      () => {
        next();
      }
    );
  };
}

module.exports = {
  logDetails,
};
