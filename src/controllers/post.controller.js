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
                totalRecords: total,
                currentPage: page,
                totalPages: Math.ceil(total / limit),
                limit
            }
        });
    } catch (error) {
        next(error);
    }
};

const getPostById = async (req, res, next) => {
    try {
        const postId = Number(req.params.id);

        const post = await prisma.post.findUnique({
            where: { id: postId },
            include: {
                author: {
                    select: { id: true, name: true }
                },
                category: true,
                tags: {
                    include: { tag: true }
                }
            }
        });

        if (!post) {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Post detail retrieved",
            data: post
        });
    } catch (error) {
        next(error);
    }
};

const updatePost = async (req, res, next) => {
    try {
        const postId = Number(req.params.id);
        const { title, content, categoryId } = req.body;

        if (!title && !content && !categoryId) {
            return res.status(400).json({
                success: false,
                message: "No data provided to update"
            });
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                ...(title && { title }),
                ...(content && { content }),
                ...(categoryId && { categoryId })
            }
        });

        res.status(200).json({
            success: true,
            message: "Post updated successfully",
            data: updatedPost
        });
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        next(error);
    }
};


const deletePost = async (req, res, next) => {
    try {
        const postId = Number(req.params.id);

        await prisma.post.delete({
            where: { id: postId }
        });

        res.status(204).send();
    } catch (error) {
        if (error.code === "P2025") {
            return res.status(404).json({
                success: false,
                message: "Post not found"
            });
        }
        next(error);
    }
};




module.exports = {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost
};
