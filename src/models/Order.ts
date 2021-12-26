import mongoose, { Schema } from 'mongoose';
import { EOrderStatus, EOrderType } from './../constant/order.status';
import { orderNoNumber } from './../common/text.helper';
const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

export interface OrderDocument extends mongoose.Document {
  orderNo: string;
  name: string;
  email: string;
  user: string;
  status: number;
  quantity: number;
  url: string;
  orderType: string;
  description: string;
  orderDate: Date;
  total_price: number;
  phone: string;
  shippingAddress: string;
  paymentMethod: number;
  transport_method: number;
  deliveryDate: Date;
  deliveryTime: string;
}

const OrderSchema = new mongoose.Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    orderNo: { type: String, default: orderNoNumber },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String },
    status: { type: String, default: EOrderStatus.REGISTER_ORDER, enum: EOrderStatus }, // 0: Processing - 1: delivering - 2: Delivered - 3: Canceled
    email: { type: String },
    phone: { type: String },
    orderType: { type: String, enum: EOrderType, default: EOrderType.PURCHASE_ORDER },
    quantity: { type: Number, default: 0 },
    url: { type: String },
    total_price: { type: Number, default: null },
    orderDate: { type: Date, default: Date.now },
    description: { type: String },
    shippingAddress: { type: String },
    paymentMethod: { type: String }, // 0: cash - 1: atm
    deliveryMethod: { type: String }, // 0: nomal
    deliveryDate: { type: Date, default: null },
    deliveryTime: { type: String },
    note: { type: String },
    extraShipFee: { type: Number },
    fixedTotalFee: { type: Number },
  },
  schemaOptions,
);

const Order = mongoose.model('Order', OrderSchema);
export default Order;
