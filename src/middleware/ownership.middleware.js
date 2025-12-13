const prisma = require("../config/db");

const checkPostOwnership = async (req, res, next) => {
    try {
        const postId = parseInt(req.params.id);
        const user = req.user;

        const post = await prisma.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        // Admin boleh bypass
        if (user.role === "ADMIN") {
            return next();
        }

        if (post.authorId !== user.userId) {
            return res.status(403).json({
                success: false,
                message: "You do not own this resource"
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = checkPostOwnership;
