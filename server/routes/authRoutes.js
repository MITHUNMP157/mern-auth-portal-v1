import express from "express";
import {
  register,
  login,
  authMiddleware,
  adminMiddleware,
  updateUser,
  userData,
  profileData,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, adminMiddleware, userData);
router.get("/profile/:id", authMiddleware, profileData);
router.put("/user/:id", updateUser, authMiddleware, adminMiddleware);

export default router;
