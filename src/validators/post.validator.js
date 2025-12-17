const { z } = require("zod");

const createPostSchema = z.object({
    title: z.string().min(3, "Title must be at least 3 characters"),
    content: z.string().min(10, "Content must be at least 10 characters"),
    categoryId: z.number().int().positive(),
    tags: z.array(z.number()).optional()
});

const updatePostSchema = z
    .object({
        title: z.string().min(3).optional(),
        content: z.string().min(10).optional(),
        categoryId: z.number().int().positive().optional(),
        tags: z.array(z.number()).optional()
    })
    .refine(
        (data) => Object.keys(data).length > 0,
        "At least one field must be provided"
    );

module.exports = {
    createPostSchema,
    updatePostSchema
};
