const express = require("express");
const app = express();

require("dotenv").config();

const PORT = 8001;
const cookieParser = require("cookie-parser");

//  Module Imports
const { connectDb } = require("./connection.js");
// const { logDetails } = require("./middlewares/url.js");
const { checkForAuthentication, restrictTo } = require("./middlewares/auth");

const UserRoute = require("./routes/user.js");
const Urlroute = require("./routes/url.js");
const staticRoute = require("./routes/staticRouter.js");

const URL = require("./models/url.js");

// Connecting DataBase
connectDb(`${process.env.MONGO_URL}`);

//  EJS
app.set("view engine", "ejs");
// app.set("views", path.resolve("./views"));

// MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(checkForAuthentication);

// Routes
app.use("/url", restrictTo(["NORMAL", "ADMIN"]), Urlroute);
app.use("/", staticRoute);
app.use("/user", UserRoute);

app.get("/url/:ShortId", async (req, res) => {
  const shortId = req.params.ShortId;

  const entry = await URL.findOneAndUpdate(
    { shortId: shortId },
    {
      $push: { visitsHistory: { timeStamp: Date.now() } },
    }
  );
  res.redirect(entry.redirectUrl);
});

// Server
app.listen(PORT, () => {
  console.log(`Server started succesfully at ${PORT}!`);
});
