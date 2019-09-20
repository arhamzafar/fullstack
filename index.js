const express = require("express");
const authRoutes = require("./routes/authRoutes.js");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./models/User.js");
require("./services/passport.js");
const app = express();
const keys = require("./config/keys.js");
authRoutes(app);

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

DbConnection();
async function DbConnection() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Task2", {
      useNewUrlParser: true
    });
    app.listen(PORT, () => console.log(`listening on port ${PORT}!`));
  } catch (error) {
    console.log(error);
  }
}
