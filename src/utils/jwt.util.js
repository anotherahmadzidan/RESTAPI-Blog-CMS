const jwt = require("jsonwebtoken");
const { accessTokenConfig, refreshTokenConfig } = require("../config/jwt");

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
    generateRefreshToken
};