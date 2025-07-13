import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  stripeSessionId: { type: String, required: true },
  status: { type: String, enum: ['pending', 'paid', 'cancelled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  
  // 🔗 Reference to Customer
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },

}, { timestamps: true });

export default mongoose.models.Order || mongoose.model("Order", orderSchema);
