const { Prisma } = require("@prisma/client");
const jwt = require("jsonwebtoken");

const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === "P2002") {
            statusCode = 409;
            message = "Duplicate record";
        }

        if (err.code === "P2025") {
            statusCode = 404;
            message = "Resource not found";
        }
    }

    // JWT errors
    if (err.name === "TokenExpiredError") {
        return res.status(401).json({
            success: false,
            message: "Token expired"
        });
    }

    if (err.name === "JsonWebTokenError") {
        return res.status(401).json({
            success: false,
            message: "Invalid token"
        });
    }

    const response = {
        success: false,
        message
    };

    if (process.env.NODE_ENV === "development") {
        response.stack = err.stack;
    }

    res.status(statusCode).json(response);
};

module.exports = errorHandler;
