import mongoose, { Schema } from 'mongoose';
import { EPackStatus } from './../constant/pack.status';

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
export interface PackDocument extends mongoose.Document {
  packNo: string;
}
const PackSchema = new mongoose.Schema(
  {
    packNo: { type: String },
    totalPrice: { type: Number, default: 0 },
    totalWegiht: { type: Number, default: 0 },
    overseaFee: { type: Number, default: 0 },
    jpDomesticFee: { type: Number, default: 0 },
    vnDomesticFee: { type: Number, default: 0 },
    startShipDate: Date,
    arrivedDate: { type: Date },
    status: { type: String, enum: EPackStatus, default: EPackStatus.REGISTER_ORDER },
    note: { type: String },
  },
  schemaOptions,
);
const Pack = mongoose.model('Pack', PackSchema);
export default Pack;
