import { Schema, model, Document } from "mongoose";

export interface IOtp extends Document {
    user: mongoose.Types.ObjectId;
    code: string;
    purpose: "REGISTRATION" | "LOGIN" | "TRANSACTION";
    expiresAt: Date;
    used: boolean;
}

const OtpSchema = new Schema<IOtp>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    purpose: {
        type: String,
        enum: ["REGISTRATION", "LOGIN", "TRANSACTION"],
        required: true,
    },
    expiresAt: {
        type: Date, 
        required: true,
    },
    used: {
        type: Boolean,
        default: false,
    },
});

export const OTP = model<IOtp>("OTP", OtpSchema);