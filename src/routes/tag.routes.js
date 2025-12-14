const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware");
const validate = require("../middleware/validation.middleware");
const {
    createTagSchema,
    updateTagSchema
} = require("../validators/tag.validator");
const {
    getTags,
    createTag,
    updateTag,
    deleteTag
} = require("../controllers/tag.controller");

const router = express.Router();

router.get("/", getTags);

// Hanya Admin yang boleh memanipulasi master data Tag
router.post("/", authenticate, authorize("ADMIN"), validate(createTagSchema), createTag);
router.put("/:id", authenticate, authorize("ADMIN"), validate(updateTagSchema), updateTag);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteTag);

module.exports = router;