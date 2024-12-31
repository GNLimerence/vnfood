import { Food } from "../models/Food.js";
import { Like } from "../models/Like.js";
import { Comment } from "../models/Comment.js";
import { Rating } from "../models/Rating.js";
import { User } from "../models/User.js";
import { auth } from "../middleware/auth.js";
import express from "express";

const router = express.Router();
router.post("/foods/:id/like", auth, async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    const user = await User.findById(req.user.userId);
    const existingLike = await Like.findOne({
      foodId: food._id,
      userId: req.user.userId,
    });

    if (existingLike) {
      await existingLike.deleteOne();
      food.stats.likesCount--;
      user.favoriteFood = user.favoriteFood.filter(
        (id) => id.toString() !== food._id.toString()
      );
      console.log("del", user.favoriteFood);
    } else {
      await Like.create({
        foodId: food._id,
        userId: req.user.userId,
      });
      food.stats.likesCount++;
      user.favoriteFood.push(food._id);
      console.log("add", user.favoriteFood);
    }
    await food.save();
    await user.save();
    res.json({ likesCount: food.stats.likesCount });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add comment
router.post("/foods/:id/comments", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const comment = new Comment({
      foodId: req.params.id,
      userId: user._id,
      content: req.body.content,
      user: {
        username: user.username,
      },
    });
    await comment.save();

    const food = await Food.findById(req.params.id);
    food.stats.commentsCount++;
    await food.save();

    res.status(201).json(comment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Add rating
router.post("/foods/:id/ratings", auth, async (req, res) => {
  try {
    const { score } = req.body;
    const food = await Food.findById(req.params.id);

    let rating = await Rating.findOne({
      foodId: food._id,
      userId: req.user.userId,
    });

    if (rating) {
      rating.score = score;
      await rating.save();
    } else {
      rating = await Rating.create({
        foodId: food._id,
        userId: req.user.userId,
        score,
      });
      food.stats.ratingsCount++;
    }

    // Update average rating
    const ratings = await Rating.find({ foodId: food._id });
    const average =
      ratings.reduce((acc, curr) => acc + curr.score, 0) / ratings.length;
    food.stats.averageRating = Number(average.toFixed(1));
    await food.save();

    res.json({
      averageRating: food.stats.averageRating,
      ratingsCount: food.stats.ratingsCount,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get recommendations based on preferences
router.get("/recommendations", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    const { tastes, regions, temperature } = user.preferences;

    const query = {
      $and: [{ tasteTags: { $in: tastes } }, { region: { $in: regions } }],
    };
    if (temperature) {
      query.temperature = temperature;
    }

    const recommendations = await Food.find(query)
      .sort({ "stats.averageRating": -1 })
      .limit(10);

    res.json(recommendations);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
