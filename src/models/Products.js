import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }], // Multiple categories
  is_stock: { type: Boolean, default: true },
  custom_url: { type: String, unique: true },
  rating: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  slug: { type: String, required: true, unique: true }
});

const Product = mongoose.model("Product1", productSchema);

module.exports = Product;
