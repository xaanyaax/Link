import express from "express";
import { protect } from "../middlewares/AuthMiddleware";

const router = express.Router();

router.get("/profile", protect, (req, res) => {
  res.json({ message: "Welcome to your profile", user: req.user });
});

export default router;
