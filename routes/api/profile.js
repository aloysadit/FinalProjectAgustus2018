//location, bio, exp, education, dsb

const express = require("express");
const router = express.Router();

router.get("/test", (req, res) =>
  res.json({ pesan: "Profile sudah berjalan" })
);
// ini mengarah ke '/api/profile/test'
// walaupun cuma ditulis '/test'

module.exports = router;
// supaya server.js bisa konek ke sini
