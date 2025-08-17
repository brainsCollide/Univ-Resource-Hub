const express = require("express");
const {  getMe, registerAdminUser ,registerUser, loginUser, logoutUser, loginWithGoogle } = require("../controller/authController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


router.get("/me", authMiddleware, getMe);
router.post("/register/admin", authMiddleware ,registerAdminUser);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/google", loginWithGoogle);


module.exports = router;
