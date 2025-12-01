import express from "express";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { isAdmin, verifyToken } from "../middleware/middleware.js";
const router = express.Router();
const secretKey = "your-secret-key";

router.post("/register", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "email already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashed, role });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    console.log("Register Error:", error.message);
    res.status(401).json({ message: "Register Failed:", error });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id, role: user.role }, secretKey, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login success",
      token,
      role: user.role,
      userId: user._id,
      userName: user.name,
      userEmail: user.email,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(400).json({ error: error.message });
  }
});
router.get("/users", verifyToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.find().select("-password");

    res.json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch users", error: error.message });
  }
});
router.get("/profile/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/verifyToken", verifyToken, (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ valid: false, message: "Unauthorized" });
    }
    res.status(200).json({
      valid: true,
      user: req.user,
    });
  } catch (error) {
    console.log("VerifyToken Error:", error);
    res.status(500).json({
      valid: false,
      message: "Token verification failed",
      error: error.message,
    });
  }
});

router.get("/admin", verifyToken, isAdmin, (req, res) => {
  res.json({ message: "Welcome Admin!" });
});

export default router;
