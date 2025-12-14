const { z } = require("zod");

const createTagSchema = z.object({
    name: z.string().min(2, "Tag name must be at least 2 characters")
});

const updateTagSchema = z.object({
    name: z.string().min(2, "Tag name must be at least 2 characters")
});

module.exports = {
    createTagSchema,
    updateTagSchema
};