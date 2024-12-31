import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  region: {
    type: String,
    required: true,
    enum: ["北部", "中部", "南部"], // "north", "mid", "south" đã được dịch sang tiếng Nhật
  },

  tasteTags: [
    {
      type: String,
      required: true,
      enum: [
        "甘味", // "sweetness"
        "酸味", // "sourness"
        "塩味", // "saltiness"
        "苦味", // "bitterness"
        "旨味", // "savoriness"
        "辛味", // "spicy"
      ],
    },
  ],

  foodType: {
    type: String,
    required: true,
    enum: ["ヌードル", "ライス", "バインミー", "その他"], // "noodles", "rice", "banhmi", "other" đã được dịch sang tiếng Nhật
  },

  ingredients: [String],
  spices: [String],
  preparationTime: String,
  difficultyLevel: String,
  imageUrl: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  stats: {
    likesCount: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    ratingsCount: {
      type: Number,
      default: 0,
    },
  },
  isApproved: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const Food = mongoose.model("Food", foodSchema);
