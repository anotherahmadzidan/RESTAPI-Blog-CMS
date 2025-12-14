require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const healthRoutes = require("./routes/health.routes");

const logger = require("./middleware/logger.middleware");

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/health", healthRoutes);

app.use(logger);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);
