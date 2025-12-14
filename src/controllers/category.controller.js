const prisma = require("../config/db");

const getCategories = async (req, res, next) => {
    try {
        const categories = await prisma.category.findMany({
            include: {
                _count: { select: { posts: true } }
            }
        });

        res.status(200).json({
            success: true,
            message: "Categories retrieved",
            data: categories
        });
    } catch (error) {
        next(error);
    }
};

const createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const category = await prisma.category.create({
            data: { name }
        });

        res.status(201).json({
            success: true,
            message: "Category created",
            data: category
        });
    } catch (error) {
        next(error);
    }
};

const updateCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        const category = await prisma.category.update({
            where: { id },
            data: { name }
        });

        res.status(200).json({
            success: true,
            message: "Category updated",
            data: category
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        next(error);
    }
};

const deleteCategory = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        await prisma.category.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ success: false, message: "Category not found" });
        }
        next(error);
    }
};

module.exports = {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
};