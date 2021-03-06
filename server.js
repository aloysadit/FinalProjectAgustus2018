const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const posts = require("./routes/api/posts");

const app = express();

// Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Koneksi Mongoose ke MongoDB
mongoose
  .connect(db)
  .then(() => console.log("MongoDB tersambung"))
  .catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());

// Passport Config
require("./config/passport")(passport);

app.get("/", (req, res) => res.send("Dah nyambung Bro!"));

//Use Routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/posts", posts);

const port = process.env.PORT || 5000;
// karena mau di deploy di HEROKU

app.listen(port, () => console.log(`Server nyambung di PORT ${port}`));
