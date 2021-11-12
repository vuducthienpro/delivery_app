import mongoose, { Schema } from 'mongoose';
import { EOrderStatus, EOrderType } from './../constant/order.status';
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

export interface OrderDocument extends mongoose.Document {
  name: string;
  email: string;
  user: string;
  status: number;
  quantity: number;
  orderType: string;
  description: string;
  orderDate: Date;
  total_price: number;
  phone: string;
  shippingAddress: string;
  paymentMethod: number;
  transport_method: number;
  delivery_date: Date;
}

const OrderSchema = new mongoose.Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    status: { type: String, default: EOrderStatus.REGISTER_ORDER, enum: EOrderStatus }, // 0: Processing - 1: delivering - 2: Delivered - 3: Canceled
    email: { type: String },
    phone: { type: String },
    orderType: { type: String, enum: EOrderType, default: EOrderType.PURCHASE_ORDER },
    quantity: { type: Number, default: 0 },
    total_price: { type: Number, default: 0 },
    orderDate: { type: Date, default: Date.now },
    description: { type: String },
    shippingAddress: { type: String },
    paymentMethod: { type: String }, // 0: cash - 1: atm
    deliveryMethod: { type: String }, // 0: nomal
    delivery_date: { type: Date },
  },
  schemaOptions,
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
