//  UUID
const { v4: uuidv4 } = require("uuid");

const user = require("../models/user");
const { setUser } = require("../service/auth");

async function handleSignUp(req, res) {
  const { name, email, password } = req.body;
  await user.create({
    name: name,
    email: email,
    password: password,
  });
  return res.render("home");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const data = await user.findOne({ email, password });

  if (!data) {
    return res.render("login", {
      error: "Incorrect Password or Email.",
    });
  } else {
    const token = setUser(data);
    res.cookie("token", token);
    // return res.render("home");
    return res.redirect("/");
  }
}

module.exports = {
  handleSignUp,
  handleLogin,
};
