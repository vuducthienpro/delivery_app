import mongoose, { Schema } from 'mongoose';
import { EProductStatus } from './../constant/product.status';
export interface ProductDocument extends mongoose.Document {
  _id: number;
  category_id: string;
  order: number;
  name: string;
  image: string;
  price: number;
  total: number;
  status: string;
  quantity: number;
  description: string;
  shipCompany: string;
  estimatedWeight: number;
  fixedWeight: number;
  confirmed: boolean;
  customerNote: string;
  staffNote: string;
}

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const ProductSchema = new mongoose.Schema(
  {
    // category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    category_id: { type: String },
    order_id: { type: String },
    name: { type: String, required: false },
    image: { type: String, required: false },
    price: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    status: { type: String, default: EProductStatus.REGISTER_ORDER }, // 0: Out of stock - 1: Stocking
    quantity: { type: Number, default: 0, required: false },
    shipCompany: { type: String },
    description: { type: String },
    estimatedWeight: { type: Number },
    fixedWeight: Number,
    confirmed: { type: Boolean, default: false },
    customerNote: { type: String },
    staffNote: String,
  },
  schemaOptions,
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;
