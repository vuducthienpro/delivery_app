import Feedback, { FeedbackDocument } from '../models/Feedback';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import escapeStringRegexp from 'escape-string-regexp';
import winston from '../config/winston';

export class FeedbackService {
  public static getAll = async () => {
    return await Feedback.find();
  };

  public static getFeedbackById = (id: FilterQuery<FeedbackDocument>) => {
    return Feedback.findById(id);
  };

  public static insertFeedback = async (dataBody: DocumentDefinition<FeedbackDocument>) => {
    const feedback = await Feedback.find({ description: dataBody.description }).exec();
    if (feedback.length === 0) {
      return Feedback.create(dataBody);
    }
  };

  public static updateFeedback = async (
    id: FilterQuery<FeedbackDocument>,
    dataBody: UpdateQuery<FeedbackDocument>,
  ) => {
    const feedback = await Feedback.findById(id).exec();
    if (feedback) {
      await Feedback.updateOne({ _id: id }, dataBody);
      return dataBody;
    }
  };

  public static DeleteFeedback = async (id: FilterQuery<FeedbackDocument>) => {
    const feedback = await Feedback.findById(id).exec();
    if (feedback) {
      await Feedback.deleteOne({ _id: id });
      return feedback;
    }
  };
}
