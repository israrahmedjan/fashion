import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  parent_category: { type: mongoose.Schema.Types.Mixed, default: 0 }, // Can be 0 or ObjectId (for subcategories)
  slug: { type: String, required: true, unique: true }
});

const Category = mongoose.model("Category1", categorySchema);

module.exports = Category;
