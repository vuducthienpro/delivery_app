import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const CategorySchema = new mongoose.Schema({
    products: [{type: Schema.Types.ObjectId, ref: 'Product'}],
    name: {type: String, required: true},
    image: {type: String, required: true},
}, schemaOptions);

const Category = mongoose.model('Category', CategorySchema);
export default Category;