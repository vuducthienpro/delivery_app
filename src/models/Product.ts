import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const ProductSchema = new mongoose.Schema({
    category: [{ type: Schema.Types.ObjectId, ref: 'Category'}],
    name: {type: String, required: true},
    image: {type: String, required: true},
    price: {type: Number, required: true},
    status: {type: Number, required: true, default: 1}, // 0: Out of stock - 1: Stocking
    quantity: {type: Number, required: true},
    description: {type: String, required: true},
    schemaOptions,
});

const Product = mongoose.model('Product', ProductSchema);
export default Product;