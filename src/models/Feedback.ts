import mongoose, { Schema } from 'mongoose';

export interface FeedbackDocument extends mongoose.Document {
  _id: number;
  description: string;
  image: any;
}

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};

const FeedbackSchema = new mongoose.Schema(
  {
    description: { type: String, required: true },
    image: { type: Array, required: true },
  },
  schemaOptions,
);

const Feedback = mongoose.model('Feedback', FeedbackSchema);
export default Feedback;
