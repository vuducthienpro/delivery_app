import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

export interface AdminDocument extends mongoose.Document {
  username: string;
  password: string;
  role: number;
  token: string;
}

const AdminSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: Number, default: 0 },
    token: { type: String },
  },
  schemaOptions,
);

const Admin = mongoose.model('Admin', AdminSchema);
export default Admin;
