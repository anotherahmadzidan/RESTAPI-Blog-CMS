const express = require("express");
const { register, login } = require("../controllers/auth.controller");

const authenticate = require("../middleware/auth.middleware");
const validate = require("../middleware/validation.middleware");
const {
    registerSchema,
    loginSchema
} = require("../validators/auth.validator");

const router = express.Router();

router.post("/register", validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);
router.post("/refresh", refreshToken);
router.get("/me", authenticate, me);

module.exports = router;
