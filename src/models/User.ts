import mongoose from 'mongoose';
import findOrCreate from 'mongoose-findorcreate';

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, unique: true},
    avatar: {type:String, default: 'null'},
    role: {type: String, default: 'User'},
    date: {type: Date, default: Date.now },
    social: {type: String, default: 'null'},
    social_id: {type:String, unique: true},
});

UserSchema.plugin(findOrCreate);
const User = mongoose.model('User', UserSchema);
export default User;