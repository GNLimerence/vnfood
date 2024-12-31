import { User } from "../models/User.js";
import { Food } from "../models/Food.js";
import { upload } from "../config/multer.js";
import { auth } from "../middleware/auth.js";

import express from "express";

const router = express.Router();
router.post("/foods", auth, upload.single("image"), async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const food = new Food({
      ...req.body,
      imageUrl: `/uploads/${req.file.filename}`,
      creator: {
        _id: user._id,
        username: user.username,
      },
    });
    await food.save();
    res.status(201).json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/foods", async (req, res) => {
  try {
    const { region, tasteTags, foodType, ingredients, spices } = req.query;

    // Tạo bộ lọc động
    let filter = {};

    if (region) {
      filter.region = region;
    }

    if (tasteTags) {
      filter.tasteTags = { $in: tasteTags.split(",") };
    }

    if (foodType) {
      filter.foodType = foodType;
    }

    if (ingredients) {
      filter.ingredients = { $in: ingredients.split(",") };
    }

    if (spices) {
      filter.spices = { $in: spices.split(",") };
    }

    const foods = await Food.find(filter);

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách món ăn", error });
  }
});
router.get("/foods/recommendations", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (
      !user.preferences ||
      !Object.values(user.preferences).some((val) => val?.length > 0)
    ) {
      return res.status(200).json({ surveyRequired: true });
    }

    const { tastes, regions, foodType, excludedSpices } = user.preferences;

    const filter = {
      tasteTags: tastes?.length ? { $in: tastes } : undefined,
      region: regions?.length ? { $in: regions } : undefined,
      foodType: foodType || undefined,
      spices: excludedSpices?.length ? { $nin: excludedSpices } : undefined,
    };

    Object.keys(filter).forEach(
      (key) => filter[key] === undefined && delete filter[key]
    );

    const foods = await Food.find(filter).sort({
      "stats.averageRating": -1,
      "stats.likesCount": -1,
    });

    res.status(200).json(foods);
  } catch (error) {
    res.status(500).json({ message: "Error fetching recommendations", error });
  }
});
router.get("/favorite", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("favoriteFood");

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const favoriteFoods = await Food.find({
      _id: { $in: user.favoriteFood },
    });

    res.json(favoriteFoods);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/foods/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) {
      return res.status(404).json({ error: "Food not found" });
    }
    res.json(food);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
