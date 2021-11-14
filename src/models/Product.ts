import mongoose, { Schema } from 'mongoose';

export interface ProductDocument extends mongoose.Document {
  _id: number;
  category_id: string;
  order: number;
  name: string;
  image: any;
  price: number;
  total: number;
  status: number;
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
    image: { type: Array, required: false },
    price: { type: Number, required: false },
    totalPrice: { type: Number, required: false },
    status: { type: Number, required: true, default: 1 }, // 0: Out of stock - 1: Stocking
    quantity: { type: Number ,default: 0 , required: false},
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
