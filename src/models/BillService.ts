import { Schema, model, Document } from "mongoose";

export interface IBillService extends Document {
    name: string;
    category: "AIRTIME" | "DATA" | "ELECTRICITY" | "TV";
    providerCode: string;
    active: boolean;
}

const BillServiceSchema = new Schema<IBillService>({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        enum: ["AIRTIME", "DATA", "ELECTRICITY", "TV"],
        required: true,
    },
    providerCode: {
        type: String,
        required: true,
        unique: true,
    },
    active: {
        type: Boolean,
        default: true,
    },
});

export const BillService = model<IBillService>("BillService", BillServiceSchema);