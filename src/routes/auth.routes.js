const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth.middleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, me);


module.exports = router;
