const express = require("express");
const authenticate = require("../middleware/auth.middleware");

const {
    createPost,
    getPosts,
    getPostById, // Tambahkan ini sekalian untuk jaga-jaga
    updatePost,  // Tambahkan ini (penyebab error sekarang)
    deletePost   // Tambahkan ini (agar tidak error lagi setelah ini)
} = require("../controllers/post.controller");

const validate = require("../middleware/validation.middleware");

const {
    createPostSchema,
    updatePostSchema
} = require("../validators/post.validator");

const checkPostOwnership = require("../middleware/ownership.middleware");

const router = express.Router();


router.get("/", getPosts);

router.post(
    "/",
    authenticate,
    validate(createPostSchema),
    createPost
);

router.put(
    "/:id",
    authenticate,
    checkPostOwnership,
    validate(updatePostSchema),
    updatePost
);

router.delete(
    "/:id",
    authenticate,
    checkPostOwnership,
    deletePost
);

module.exports = router;
