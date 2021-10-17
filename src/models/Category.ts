import mongoose, { Schema } from 'mongoose';

export interface CategoryDocument extends mongoose.Document {
  _id: number;
  products: [];
  name: string;
  image: any;
}

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const CategorySchema = new mongoose.Schema(
  {
    products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
    name: { type: String, required: true, unique: true },
    image: { type: Array, required: true },
  },
  schemaOptions,
);

const Category = mongoose.model('Category', CategorySchema);
export default Category;