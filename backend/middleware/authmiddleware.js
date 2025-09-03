const jwt = require("jsonwebtoken");
const User = require("../models/userModel"); // Assuming your User Mongoose model is here

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Authorization header missing or malformed" });
  }

  const token = authHeader.split(" ")[1];
  const secretKey = process.env.JWT_SECRET_KEY;

  try {
    const decoded = jwt.verify(token, secretKey);

    // Find user by decoded email
    const user = await User.findOne({ email: decoded.email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // Attach user object to request
    next();
  } catch (err) {
    console.error("JWT verification error:", err.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
