const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    console.log("Raw Cookies:", req.headers.cookie); // Debugging Safari cookies

    const token = req.cookies.token || (req.headers.cookie && req.headers.cookie.split("=")[1]);

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified; // Attach user data to req object
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};


module.exports = authMiddleware;
