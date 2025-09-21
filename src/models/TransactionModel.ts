import { Schema, model, Document } from "mongoose";

export type TransactionType = "FUND_WALLET" | "BILL_PAYMENT" | "TRANSFER";

export type Status = "PENDING" | "SUCCESS" | "FAILED";

export interface ITransaction extends Document {
    user: mongoose.Types.ObjectId;
    wallet: mongoose.Types.ObjectId;
    service?: mongoose.Types.ObjectId;
    type: TransactionType;
    amount: Number;
    status: Status;
    reference: string;
    createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    wallet: {
        type: Schema.Types.ObjectId,
        ref: "Wallet",
        required: true,
    },
    service: {
        type: Schema.Types.ObjectId,
        ref: "BillService",
        required: true,
    },
    type: {
        type: String,
        enum: ["FUND_WALLET", "BILL_PAYMENT", "TRANSFER" ],
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        enum: ["PENDING", "SUCCESS", "FAILED"],
        default: "PENDING",
    },
    reference: {
        type: String,
        unique: true,
    },
}, { timestamps: true });

export const Transaction = model<ITransaction>("Transaction", TransactionSchema);