const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: {
        type: String,
        required: function () {
            return this.authProvider !== 'google'; // Only require password if not using Google
        }
    },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    authProvider: {
        type: String,
        enum: ['native', 'google'],
        default: 'native'
    }
});
// Hash password before saving
UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
