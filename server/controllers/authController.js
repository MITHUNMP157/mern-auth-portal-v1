import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({ name, email, password: hashed, role });

    res.json({ message: "User created successfully", user });
  } catch (error) {
    console.log("Register Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "User not found" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: "Invalid password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({
      message: "Login success",
      token,
      role: user.role,
      userId: user._id,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(401).json({ error: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch {
    return res.status(401).json({ error: "Invalid token" });
  }
};

export const adminMiddleware = async (req, res, next) => {
  const user = await User.findById(req.user);
  if (!user || user.role !== "admin") {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};
