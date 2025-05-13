const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      console.log("No token provided");
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("Token decoded for user:", decoded.id);

    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      console.log("User not found for token");
      return res.status(401).json({ message: "User not found" });
    }

    next();
  } catch (error) {
    console.error("Invalid token:", error.message);
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;

