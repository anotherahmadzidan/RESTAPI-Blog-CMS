const jwt = require("jsonwebtoken");

const accessTokenConfig = {
    secret: process.env.JWT_SECRET,
    expiresIn: process.env.JWT_EXPIRES_IN || "15m"
};

const refreshTokenConfig = {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
};

const generateAccessToken = (payload) => {
    return jwt.sign(payload, accessTokenConfig.secret, {
        expiresIn: accessTokenConfig.expiresIn
    });
};

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, refreshTokenConfig.secret, {
        expiresIn: refreshTokenConfig.expiresIn
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    accessTokenConfig,
    refreshTokenConfig
};
