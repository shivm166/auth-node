import express from "express";
import {
  login,
  register,
  userId,
  logout, // Optional
} from "../controllers/authController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/user/:id", authMiddleware, userId);
router.post("/logout", logout); // Optional
router.get("/me", authMiddleware, (req, res) => {
  res.status(200).json({ user: req.user });
});

export default router;
