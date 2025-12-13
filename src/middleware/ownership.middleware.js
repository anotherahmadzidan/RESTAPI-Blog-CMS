const prisma = require("../config/db");

const checkPostOwnership = async (req, res, next) => {
    const postId = Number(req.params.id);

    if (isNaN(postId)) {
        return res.status(400).json({
            success: false,
            message: "Invalid post id"
        });
    }

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        if (req.user.role === "ADMIN") {
            return next();
        }

        if (post.authorId !== req.user.userId) {
            return res.status(403).json({
                success: false,
                message: "Forbidden resource access"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};


module.exports = checkPostOwnership;
