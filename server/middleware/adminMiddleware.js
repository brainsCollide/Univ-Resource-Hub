const adminMiddleware = (req, res, next) => {
    if (!req.user || req.user.role !== "admin") {
        return res.status(403).json({ message: "Forbidden: Only admins can perform this action" });
    }
    next();
};

module.exports = adminMiddleware;
