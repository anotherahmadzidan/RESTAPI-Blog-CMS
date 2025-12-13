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

const getPosts = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = Math.min(parseInt(req.query.limit) || 10, 50);
        const skip = (page - 1) * limit;

        const [posts, total] = await Promise.all([
            prisma.post.findMany({
                skip,
                take: limit,
                include: {
                    author: {
                        select: { id: true, name: true }
                    },
                    category: true
                },
                orderBy: { createdAt: "desc" }
            }),
            prisma.post.count()
        ]);

        res.status(200).json({
            success: true,
            message: "Posts retrieved",
            data: posts,
            pagination: {
                total,
                page,
                totalPages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        next(error);
    }
};


module.exports = {
    createPost,
    getPosts
};
