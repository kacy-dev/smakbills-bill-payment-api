import { Schema, model, Document } from "mongoose";


export interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  referralCode?: string;
  referrerdBy?: mongoose.Types.ObjectId;
  failedLoginAttempts: number;
  lockUntil?: Date;
  otpCode?: string;
  otpExpires?: Date;
  isVerified: boolean;   
  // currency: string;     
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
      type: Schema.Types.ObjectId,
      ref: "User",
      required: false,
      trim: true,
    },
    failedLoginAttempts: { 
      type: Number, 
      default: 0 
    },
    lockUntil: { 
        type: Date 
    },
    otpCode: { 
      type: String 
    },
    otpExpires: { 
      type: Date 
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

export const User = model<IUser>("User", userSchema);
