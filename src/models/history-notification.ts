import mongoose, { Schema } from 'mongoose';

const schemaOptions = {
  timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
};
export enum EHistoryNotificationType {
  MAKE_PUSCHA_BILL = 'MAKE_PUSCHA_BILL',
  FINISH_WEIGHT_MEASUREMENT = 'FINISH_WEIGHT_MEASUREMENT',
  ARRIVED_IN_HANOI = 'ARRIVED_IN_HANOI',
}
const HistoryNotificationSchema = new mongoose.Schema(
  {
    // category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
    order: { type: Schema.Types.ObjectId, ref: 'Order' },
    type: { type: String, enum: EHistoryNotificationType, default: EHistoryNotificationType.MAKE_PUSCHA_BILL },
  },
  schemaOptions,
);

const HistoryNotification = mongoose.model('historyNotification', HistoryNotificationSchema);
export default HistoryNotification;
