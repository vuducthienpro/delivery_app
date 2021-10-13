import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

export interface OrderDocument extends mongoose.Document {
    name: string;
    user_id: number,
    status: number;
    quantity: number;
    description: string;
    total_price: number;
    phone: string,
    address: string,
    payment_method: number;
    transport_method: number;
    delivery_date: Date;
}

const OrderSchema = new mongoose.Schema({
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    status: {type: Number, required: true, default: 0}, // 0: Processing - 1: delivering - 2: Delivered - 3: Canceled
    quantity: {type: Number, required: true},
    total_price: {type: Number, required: true},
    description: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    payment_method: {type: Number, required: true, default: 0}, // 0: cash - 1: atm
    transport_method: {type: Number, required: true, default: 0}, // 0: nomal
    delivery_date: {type: Date},
}, schemaOptions);

const Order = mongoose.model('Order', OrderSchema);
export default Order;