// username, email, password, segala tentang authentication

const express = require("express");
const router = express.Router();
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");

// Load input Validation dan Login Validation
const validateRegisterInput = require("../../validasi/register");
const validateLoginInput = require("../../validasi/login");

//Panggil User Model
const User = require("../../models/User");

router.get("/test", (req, res) => res.json({ pesan: "Users sudah berjalan" }));
// ini mengarah ke '/api/users/test' walaupun cuma ditulis '/test'
// @access Public

router.post("/register", (req, res) => {
  const { errors, isValid } = validateRegisterInput(req.body);

  // cek validasi di sini, sebelum user.findOne biar diproses validasi dulu sebelum lanjut
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      // errors.email= 'Email sudah terdaftar';
      // return res.status(400).json(errors);
      return res.status(400).json({ email: "Email sudah terdaftar" });
    } else {
      const avatar = gravatar.url(req.body.email, {
        //avatar ngambil dari avatar Email kalo ada
        s: "200", //size
        r: "pg", //rating
        d: "mm" //default
      });

      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        avatar: avatar,
        password: req.body.password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//@route    GET api/users/login
//@desc     Login User / Returning JWT Token
//@access   Public
router.post("/login", (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);

  // cek validasi di sini, sebelum user.findOne biar diproses validasi dulu sebelum lanjut
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  //Find User dengan Email
  User.findOne({ email: email }).then(user => {
    // Cek User
    if (!user) {
      errors.email = "data user tidak ada";
      // return res.status(404).json({
      //   email: "data user tidak ada"
      // });
      return res.status(404).json("errors");
    }

    // Cek Password
    bcrypt
      .compare(password, user.password)

      .then(isMatch => {
        if (isMatch) {
          // User Matched

          const payload = {
            id: user.id,
            name: user.name,
            avatar: user.avatar
          };

          // Sign Token
          jwt.sign(
            payload,
            keys.kunciRahasia,
            { expiresIn: 3600 },
            (err, token) => {
              res.json({
                success: true,
                token: "Bearer " + token
              });
            }
          );
        } else {
          errors.password = "password salah";
          // return res.status(400).json({
          //   pesan: "password salah"
          // });
          return res.status(400).json(errors);
        }
      });
  });
});

//@route    GET api/users/current
//@desc     return current user
//@access   Private
router.get(
  "/current",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json({
      //sebelumnya pakai res.json (req.user),
      // tapi data password user keliatan, tetap bahaya walaupun di hash
      id: req.user.id,
      name: req.user.name,
      email: req.user.email
    });
  }
);

module.exports = router;
// supaya server.js bisa konek ke sini
