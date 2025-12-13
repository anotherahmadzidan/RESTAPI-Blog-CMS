const authorize =
    (...allowedRoles) =>
        (req, res, next) => {
            const user = req.user;

            if (!user || !user.role) {
                return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            }

            if (!allowedRoles.includes(user.role)) {
                return res.status(403).json({
                    success: false,
                    message: "Forbidden"
                });
            }

            next();
        };

module.exports = authorize;