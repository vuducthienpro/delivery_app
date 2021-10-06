import mongoose, { Schema } from 'mongoose';

export interface CustomerDocument extends mongoose.Document {
    orders: [];
    name: string;
    email: string;
    phone: string;
    address: string;
}

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const CustomerSchema = new mongoose.Schema({
    orders: [{ type: Schema.Types.ObjectId, ref: 'Order'}],
    name: {type: String, required: true},
    email: {type: String, required: true},
    phone: {type: String, required: true},
    address: {type: String, required: true},
}, schemaOptions);

const Customer = mongoose.model('Customer', CustomerSchema);
export default Customer;