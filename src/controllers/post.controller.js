const prisma = require("../config/db");

const createPost = async (req, res, next) => {
    try {
        const { title, content, categoryId } = req.body;

        const post = await prisma.post.create({
            data: {
                title,
                content,
                categoryId,
                authorId: req.user.userId
            }
        });

        res.status(201).json({
            success: true,
            message: "Post created successfully",
            data: post
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPost
};
