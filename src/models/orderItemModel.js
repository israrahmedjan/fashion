import mongoose from "mongoose";
import { string } from "zod";

const orderItemSchema = new mongoose.Schema({
  // 🔗 Reference to Order
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Order', required: true },
  //productId: { type: String, required: true }, // or use ObjectId if product collection exists
 // productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true},
   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true },
  name: {type : String, required: true},
  price: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.models.OrderItem || mongoose.model("OrderItem", orderItemSchema);

