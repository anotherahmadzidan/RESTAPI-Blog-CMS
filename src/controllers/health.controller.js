const prisma = require("../config/db");

const healthCheck = async (req, res, next) => {
    try {
        await prisma.$queryRaw`SELECT 1`;

        res.status(200).json({
            success: true,
            status: "ok",
            environment: process.env.NODE_ENV || "development",
            uptime: process.uptime(),
            timestamp: new Date().toISOString(),
            services: {
                database: "connected"
            }
        });
    } catch (error) {
        error.statusCode = 503;
        error.message = "Database connection failed";
        next(error);
    }
};


module.exports = { healthCheck };
