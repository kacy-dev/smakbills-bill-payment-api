import { Schema, model, Document } from "mongoose";

export interface IWallet extends Document {
    user: mongoose.Types.ObjectId;
    balance: Number;
    currency: string;
    lastUpdated: Date;
}

const WalletSchema = new Schema<IWallet>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "user",
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    currency: {
        type: String,
        deafult: "NGN",
    },
    lastUpdated: {
        type: Date,
        default: Date.now,
    },
});


export const Wallet = model<IWallet>("Wallet", WalletSchema);

