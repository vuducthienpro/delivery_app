import mongoose, { Schema } from 'mongoose';

export interface ProductDocument extends mongoose.Document {
  _id: number;
  category_id: string;
  order: number;
  name: string;
  image: [];
  price: number;
  status: number;
  quantity: number;
  description: string;
}

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const ProductSchema = new mongoose.Schema(
  {
    // category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    category_id: { type: String, required: true },
    order: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
    name: { type: String, required: true },
    image: { type: Array, required: true },
    price: { type: Number, required: true },
    status: { type: Number, required: true, default: 1 }, // 0: Out of stock - 1: Stocking
    quantity: { type: Number, required: true },
    description: { type: String, required: true },
  },
  schemaOptions,
);

const Product = mongoose.model('Product', ProductSchema);
export default Product;