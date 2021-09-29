import mongoose from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const BannerSchema = new mongoose.Schema({
    url: {type: String, required: true},
    schemaOptions,
});

const Banner = mongoose.model('Banner', BannerSchema);
export default Banner;