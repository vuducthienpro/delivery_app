import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const OrderSchema = new mongoose.Schema({
    user: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    customer: [{ type: Schema.Types.ObjectId, ref: 'Customer'}],
    products: [{ type: Schema.Types.ObjectId, ref: 'Product'}],
    status: {type: Number, required: true}, // 0: Processing - 1: delivering - 2: Delivered - 3: Canceled
    quantity: {type: Number, required: true},
    total_price: {type: Number, required: true},
    payment_method: {type: Number, required: true, default: 0}, // 0: cash - 1: atm
    transport_method: {type: Number, required: true, default: 0}, // 0: nomal
    delivery_date: {type: Date},
}, schemaOptions);

const Order = mongoose.model('Order', OrderSchema);
export default Order;