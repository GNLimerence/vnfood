import express from "express";
import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Lấy preferences của người dùng
router.get("/users/preferences", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("preferences");
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }
    res.status(200).json(user.preferences);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cập nhật preferences của người dùng
router.put("/users/preferences", auth, async (req, res) => {
  try {
    const { tastes, regions, foodType, excludedSpices } = req.body;
    const foodTypeString = foodType.join(", ");
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ error: "Người dùng không tồn tại" });
    }

    user.preferences = {
      tastes: tastes || user.preferences.tastes,
      regions: regions || user.preferences.regions,
      foodType: foodTypeString || user.preferences.foodType,
      excludedSpices: excludedSpices || user.preferences.excludedSpices,
    };

    await user.save();

    res.status(200).json({
      message: "Cập nhật preferences thành công",
      preferences: user.preferences,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
