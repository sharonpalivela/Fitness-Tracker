const User = require("../models/userModel"); // ✅ Ensure it's declared only once
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require('express-async-handler');

// @desc   Register a new user
// @route  POST /api/users/register
// @access Public
// Remove manual hashing from registerUser
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  console.log("👉 Received register request:", req.body); // Add this line

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ name, email, password });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400).json({ message: "Invalid user data" });
  }
});


// @desc   Login user
// @route  POST /api/users/login
// @access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log("📨 Login attempt with email:", email);
  console.log("👉 Raw email received:", `"${email}"`);
  console.log("👉 Raw password received:", `"${password}"`);

  const user = await User.findOne({ email });
  console.log("✅ User found:", user);

  if (!user) {
    console.log("❌ No user found with this email");
    res.status(401);
    throw new Error("Invalid credentials");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  console.log("🔐 bcrypt.compare result:", passwordMatch);

  if (passwordMatch) {
    console.log("✅ Password match successful");
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } else {
    console.log("❌ Password does not match");
    res.status(401);
    throw new Error("Invalid credentials");
  }
});



module.exports = { registerUser, loginUser }; 
