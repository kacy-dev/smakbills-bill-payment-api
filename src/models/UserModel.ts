import { Schema, model, Document } from "mongoose";


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  referralCode?: string;
  referrerdBy?: string;
  isVerified: boolean;
  balance: number;       
  currency: string;     
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      unique: true,
      trim: true,
      minlength: [3, "Username must be at least 3 characters"],
      maxlength: [20, "Username cannot exceed 20 characters"],
      match: [/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers, and underscores"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    referralCode: {
      type: String,
      required: false,
      trim: true,
    },
    referrerdBy: {
      type: String,
      required: false,
      trim: true,
    },
    balance: {
      type: Number,
      required: true,
      default: 0,   
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    currency: {
      type: String,
      required: true,
      default: "NGN", 
    },
  },
  { timestamps: true }
);


export const User = model<IUser>("User", userSchema);
