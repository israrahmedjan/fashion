import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    stock: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
    },
    sku: {
      type: String,
      unique: true,
    },
    brand: {
      type: String,
      default: '',
    },
    categoryId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
      },
    ],
    image: {
      type: String,
    },
    imageThumb: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publicId: {
      type: String,
    },
    variationsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Variation',
      },
    ],
  },
  {
    timestamps: true, // adds createdAt and updatedAt
  }
);

const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
export default Product;
