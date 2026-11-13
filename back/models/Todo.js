const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema(
  {
    titre: {
      type: String,
      required: [true, "le titre est obligatoire"],
      trim: true,
      maxlength: [150, "le titre doit contenir au maximum 150 caractères"],
    },
    description: {
      type: String,
      trim: true,
      default: "",
      maxlength: [2000, "la description doit contenir au maximum 2000 caractères"],
    },
    urlImage: {
      type: String,
      trim: true,
      default: "",
    },
    termine: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Todo", todoSchema);
