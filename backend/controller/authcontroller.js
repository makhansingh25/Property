const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const streamUpload = require("../config/streamupload");
const userSchema = require("../validater/userValidation");
const User = require("../models/userModel");

const JWT_SECRET = process.env.JWT_SECRET_KEY;

// Signup
const signup = async (req, res) => {
  const validation = userSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({ errors: validation.error.format() });
  }

  try {
    const { username, email, password } = req.body;

    // Check for profile image upload
    let imageUrl = null;
    if (req.file) {
      const uploadResult = await streamUpload(req.file.buffer);
      imageUrl = uploadResult.secure_url;
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User is already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      image: imageUrl,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign({ email }, JWT_SECRET);

    res.status(201).json({
      message: "User signed up successfully",
      user: savedUser,
      token,
      imageUrl,
    });
  } catch (err) {
    res.status(500).json({ error: "Signup failed", details: err.message });
  }
};

// Signin
const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ error: "You need to sign up first" });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ email }, JWT_SECRET);

    res.json({ message: "You are signed in successfully ✔", token });
  } catch (err) {
    res.status(500).json({ error: "Signin failed", details: err.message });
  }
};

// Google Signin
const googleSignin = async (req, res) => {
  const { name, email, sub, picture } = req.body;

  try {
    let user = await User.findOne({ email });

    if (user) {
      const token = jwt.sign({ email }, JWT_SECRET);
      return res
        .status(200)
        .json({ message: "User signed in successfully", token });
    }

    const newUser = new User({
      google_id: sub,
      username: name,
      email,
      image: picture,
      // password: bcrypt.hashSync(sub, 10), // Dummy password if needed
    });

    await newUser.save();

    const token = jwt.sign({ email }, JWT_SECRET);
    res.status(201).json({
      message: "User signed in and created successfully",
      token,
    });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Google Signin failed", details: err.message });
  }
};

// Get Authenticated User
const user = (req, res) => {
  try {
    const user = req.user; // Ensure this is set by auth middleware
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching user", details: error.message });
  }
};

// Delete User
const DeleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await User.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "User not found" });
    }

    res
      .status(200)
      .json({ message: "Your account was deleted permanently", deleted });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Technical error", details: error.message });
  }
}; 

module.exports = {
  signup,
  signin,
  user,
  googleSignin,
  DeleteUser,
};
