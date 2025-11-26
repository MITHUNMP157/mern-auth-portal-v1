import express from "express";
import {
  register,
  login,
  authMiddleware,
  adminMiddleware,
} from "../controllers/authController.js";

import User from "../models/User.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

router.get("/users", authMiddleware, adminMiddleware, async (req, res) => {
  const users = await User.find().select("-password");
  res.json(users);
});

router.get("/profile", authMiddleware, async (req, res) => {
  const user = await User.findById(req.user).select("-password");
  res.json(user);
});

export default router;
