const express = require("express");
const authenticate = require("../middleware/auth.middleware");

const { createPost, getPosts } = require("../controllers/post.controller");

const router = express.Router();

router.post("/", authenticate, createPost);

module.exports = router;

router.get("/", getPosts);

const checkPostOwnership = require("../middleware/ownership.middleware");

router.put(
    "/:id",
    authenticate,
    checkPostOwnership,
    updatePost
);

router.delete(
    "/:id",
    authenticate,
    checkPostOwnership,
    deletePost
);


