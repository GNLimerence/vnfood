import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();
router.post("/preferences", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    user.preferences = req.body;
    await user.save();
    res.json(user.preferences);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
