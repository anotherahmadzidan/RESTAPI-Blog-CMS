require("dotenv").config(); // Pastikan env terbaca jika file ini dipanggil terpisah

const accessTokenConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m"
};

const refreshTokenConfig = {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
};

module.exports = {
    accessTokenConfig,
    refreshTokenConfig
};