const User = require("../model/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Signup

const loginWithGoogle = async (req, res) => {
    try {
        const { idToken } = req.body;

        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, sub } = payload;

        if (!email) {
            return res.status(400).json({ message: "Invalid Google token" });
        }

        let user = await User.findOne({ email });

        if (!user) {
            // Register new user if not found
            const user = new User({
            username: payload.name,
            email: payload.email,
            authProvider: "google", // custom field
            role: "user",
            });
            await user.save();
        }

        // Generate token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        res.cookie("token", token, {
            httpOnly: false,  // Set to true in production
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
        });

        res.json({ message: "Logged in via Google", user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to authenticate with Google" });
    }
};

const getMe = async (req, res) => {
    try {
        const token = req.cookies.token; // Get token from cookies

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Find the user based on the decoded id
        const user = await User.findById(decoded.id).select("-password"); // Do not send password

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({ user }); // Send user info (without password)
    } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Invalid or expired token" });
    }
};

const registerAdminUser = async (req, res) => {
    const { username, email, password, role } = req.body;

    if (role && role !== 'admin') {
        return res.status(400).json({ message: "You can only assign 'admin' role to new users." });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
    }

    // Always set role to "user" for normal users, or allow creating "admin" if explicitly stated
    const newUser = new User({
        username,
        email,
        password,
        role: role || 'user',  // Default to 'user' if no role specified
    });

    try {
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Always set role to "user" during registration
        const newUser = new User({ username, email, password, role: "user" });
        await newUser.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Login
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: "1d"
        });

        // Set cookie with proper options for Safari
        res.cookie("token", token, {
            httpOnly: false,  // Change to `true` in production
            secure: process.env.NODE_ENV === "production", // Use Secure only in production
            sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", 
        });

        res.json({ message: "Login successful", user: { id: user._id, username: user.username, role: user.role } });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Logout
const logoutUser = (req, res) => {
    res.clearCookie("token", {
        httpOnly: false, // Change to `true` in production
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    });
    res.json({ message: "Logged out successfully" });
};


module.exports = { getMe, registerAdminUser ,registerUser, loginUser, logoutUser, loginWithGoogle };
