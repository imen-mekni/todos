const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      index: true,
    },
    name: {
      type: String,
      required: [true, "name is required"],
      trim: true,
      maxlength: [150, "name must be at most 150 characters"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "description must be at most 2000 characters"],
    },
    imageUrl: {
      type: String,
      trim: true,
      default: "",
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
