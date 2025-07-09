import mongoose from 'mongoose';
import { data } from 'react-router-dom';

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isVarified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    forgatPasswordToken: { type: String, default: "data" },
    forgetPasswordTokenExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000), // 10 minutes from now
    },
    verifyToken: { type: String, default: "data2" },
    verifyTokenExpiry: {
      type: Date,
      default: () => new Date(Date.now() + 10 * 60 * 1000),
    },
    
  },
  { timestamps: true }
);
//{ timestamps: true }

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;