import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, unique: true },
    avatar: { type: String, default: 'null' },
    role: { type: String, default: 'User' },
    social: { type: String, default: 'null' },
    social_id: { type: String, unique: true },
    token: [{ type: String }],
  },
  schemaOptions,
);

const User = mongoose.model('User', UserSchema);
export default User;
