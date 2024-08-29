// const sessionIdToUserMap = new Map();

//  using JWT for authentication
const jwt = require("jsonwebtoken");
const secret = "$url@001#";

function setUser(user) {
  // sessionIdToUserMap.set(id, user);

  return jwt.sign(
    { _id: user._id, email: user.email, role: user.role },
    secret
  );
}

function getUser(token) {
  // return sessionIdToUserMap.get(id);
  if (!token) return null;
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
