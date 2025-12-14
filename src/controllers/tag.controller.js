const prisma = require("../config/db");

const getTags = async (req, res, next) => {
    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: { select: { posts: true } }
            }
        });

        res.status(200).json({
            success: true,
            message: "Tags retrieved",
            data: tags
        });
    } catch (error) {
        next(error);
    }
};

const createTag = async (req, res, next) => {
    try {
        const { name } = req.body;

        const tag = await prisma.tag.create({
            data: { name }
        });

        res.status(201).json({
            success: true,
            message: "Tag created",
            data: tag
        });
    } catch (error) {
        // Handle unique constraint error
        if (error.code === 'P2002') {
            return res.status(409).json({ success: false, message: "Tag already exists" });
        }
        next(error);
    }
};

const updateTag = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const { name } = req.body;

        const tag = await prisma.tag.update({
            where: { id },
            data: { name }
        });

        res.status(200).json({
            success: true,
            message: "Tag updated",
            data: tag
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ success: false, message: "Tag not found" });
        }
        next(error);
    }
};

const deleteTag = async (req, res, next) => {
    try {
        const id = Number(req.params.id);

        await prisma.tag.delete({
            where: { id }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({ success: false, message: "Tag not found" });
        }
        next(error);
    }
};

module.exports = {
    getTags,
    createTag,
    updateTag,
    deleteTag
};