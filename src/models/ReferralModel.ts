import mongoose, { Schema, model, Document } from "mongoose";

export interface IReferral extends Document {
    referrer: mongoose.Types.ObjectId;
    referee: mongoose.Types.ObjectId;
    reward: Number;
}

const ReferralSchema = new Schema<IReferral>({
    referrer: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    referee: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reward: {
        type: Number,
        default: 0,
    },
});

export const Referral = model<IReferral>("Referral", ReferralSchema);