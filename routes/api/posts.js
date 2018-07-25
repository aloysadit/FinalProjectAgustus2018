const express = require("express");
const router = express.Router();

//
router.get("/test", (req, res) => res.json({ pesan: "Posts sudah berjalan" }));
// ini mengarah ke '/api/posts/test'
// walaupun cuma ditulis '/test'

module.exports = router;
// supaya server.js bisa konek ke sini
