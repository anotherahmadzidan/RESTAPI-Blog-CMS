require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const categoryRoutes = require("./routes/category.routes");
const tagRoutes = require("./routes/tag.routes");
const healthRoutes = require("./routes/health.routes");

const logger = require("./middleware/logger.middleware");

// 1. Security Middleware
app.use(helmet());
app.use(cors());

// 2. Parser Middleware (WAJIB ADA AGAR BISA BACA JSON)
app.use(express.json());

// 3. Logger
app.use(logger);

// 4. Routes
app.use("/api/auth", authRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/tags", tagRoutes);
app.use("/api/health", healthRoutes);

app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        message: "API is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
});

// 5. Error Handler
const errorHandler = require("./middleware/error.middleware");
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});