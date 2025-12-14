const bcrypt = require("bcrypt");
const prisma = require("../config/db");
const jwt = require("jsonwebtoken");

const {
    generateAccessToken,
    generateRefreshToken,
    refreshTokenConfig
} = require("../config/jwt");

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await prisma.user.findUnique({
            where: { email }
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already registered"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            }
        });

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        next(error);
    }
};

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const payload = {
            userId: user.id,
            role: user.role
        };

        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                accessToken,
                refreshToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const refresh = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(400).json({
                success: false,
                message: "Refresh token required"
            });
        }

        const decoded = jwt.verify(
            refreshToken,
            refreshTokenConfig.secret
        );

        const payload = {
            userId: decoded.userId,
            role: decoded.role
        };

        const newAccessToken = generateAccessToken(payload);

        res.status(200).json({
            success: true,
            message: "Access token refreshed",
            data: {
                accessToken: newAccessToken
            }
        });
    } catch (error) {
        next(error);
    }
};

const me = async (req, res, next) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: req.user.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true
            }
        });

        res.status(200).json({
            success: true,
            message: "User profile retrieved",
            data: user
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    register,
    login,
    refresh,
    me
};
