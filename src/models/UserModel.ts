import { Schema, model, Document, Types } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  phone: string;
  password: string;
  referralCode: string;
  referredBy?: Types.ObjectId;
  referralEarnings: number;
  failedLoginAttempts: number;
  lockUntil?: Date;
  otpCode?: string;
  otpExpires?: Date;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: [2, "Full name must be at least 2 characters"],
      maxlength: [50, "Full name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email address"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      unique: true,
      trim: true,
      match: [/^\+?[0-9]{7,15}$/, "Please provide a valid phone number"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    referralCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    referredBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
    },
    referralEarnings: {
      type: Number,
      default: 0,
    },
    failedLoginAttempts: {
      type: Number,
      default: 0,
    },
    lockUntil: {
      type: Date,
    },
    otpCode: {
      type: String,
    },
    otpExpires: {
      type: Date,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.methods.isLocked = function (): boolean {
  return !!(this.lockUntil && this.lockUntil > new Date());
};

// Auto-generate referralCode before saving (smakbills + random string)
userSchema.pre("save", function (next) {
  if (!this.referralCode) {
    this.referralCode =
      "smakbills-" + Math.random().toString(36).substring(2, 10);
  }
  next();
});

export const User = model<IUser>("User", userSchema);
