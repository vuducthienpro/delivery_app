import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const UserSchema = new mongoose.Schema({
    customer: [{type: Schema.Types.ObjectId, ref: 'Customer'}],
    orders: [{type: Schema.Types.ObjectId, ref: 'Order'}],
    name: {type: String },
    email: {type: String },
    avatar: {type:String, default: 'null'},
    role: {type: String, default: 'User'},
    social: {type: String, default: 'null'},
    social_id: {type:String },
}, schemaOptions);

const User = mongoose.model('User', UserSchema);
export default User;