import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
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
      userName: user.name,
      userEmail: user.email,
    });
  } catch (error) {
    console.log("Login Error:", error.message);
    res.status(400).json({ error: error.message });
  }
};

export const userData = async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
};

export const profileData = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, role },
      { new: true }
    ).select("-password");

    if (!updatedUser)
      return res.status(404).json({ message: "User Not Found" });

    res.json({ message: "User Updated Successfully", updatedUser });
  } catch (error) {
    res.status(500).json({ message: "Update Failed", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser)
      return res.status(404).json({ message: "User Not Found" });

    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Delete Failed", error });
  }
};
