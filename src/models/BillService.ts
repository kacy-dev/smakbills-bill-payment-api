import { Schema, model, Document } from "mongoose";

export interface IBillService extends Document {
    name: string;
    category: "AIRTIME" | "DATA" | "ELECTRICITY" | "TV";
    providerCode: string;
    active: boolean;
}

const BillServiceSchema = new Schema<IBillService>({
    name: {
        
    }
})