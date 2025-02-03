// models/Product.js
import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  category_id: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    }
  ],
  is_stock: {
    type: Boolean,
    default: true
  },
  main_image: [
    {
      thumbnail: { type: String },
      medium: { type: String },
      large: { type: String }
    }
  ],
  custom_url: {
    type: String,
    unique: true,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  image_gallery: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Image'
    }
  ],
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Auto-update updated_at on save
productSchema.pre('save', function (next) {
  this.updated_at = Date.now();
  next();
});

export default mongoose.models.Product || mongoose.model('Product', productSchema);
