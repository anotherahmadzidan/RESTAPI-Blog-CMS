require("dotenv").config();
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

app.use("/api/auth", authRoutes);

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
