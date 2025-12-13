const express = require("express");
const authenticate = require("../middleware/auth.middleware");

const { createPost } = require("../controllers/post.controller");

const router = express.Router();

router.post("/", authenticate, createPost);

module.exports = router;
