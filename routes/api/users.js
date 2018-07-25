// username, email, password, segala tentang authentication

const express = require("express");
const router = express.Router();

router.get("/test", (req, res) => res.json({ pesan: "Users sudah berjalan" }));
// ini mengarah ke '/api/users/test' walaupun cuma ditulis '/test'
// @access Public

module.exports = router;
// supaya server.js bisa konek ke sini
