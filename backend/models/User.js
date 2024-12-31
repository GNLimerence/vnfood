import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  preferences: {
    tastes: [String],
    regions: [String],
    foodType: String,
    excludedSpices: [String],
  },
  favoriteFood: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Food",
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const User = mongoose.model("User", userSchema);
