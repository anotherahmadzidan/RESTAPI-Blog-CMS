const express = require("express");

const app = express();
const PORT = 3000;

// middleware basic
app.use(express.json());

// health check
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
