const express = require("express");
const authenticate = require("../middleware/auth.middleware");
const authorize = require("../middleware/role.middleware"); // RBAC
const validate = require("../middleware/validation.middleware");
const {
    createCategorySchema,
    updateCategorySchema
} = require("../validators/category.validator");
const {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} = require("../controllers/category.controller");

const router = express.Router();

// Public: List categories
router.get("/", getCategories);

// Protected: Only Admin can manage categories (Example logic)
// Jika User biasa boleh create, hapus 'authorize("ADMIN")'
router.post("/", authenticate, authorize("ADMIN"), validate(createCategorySchema), createCategory);
router.put("/:id", authenticate, authorize("ADMIN"), validate(updateCategorySchema), updateCategory);
router.delete("/:id", authenticate, authorize("ADMIN"), deleteCategory);

module.exports = router;