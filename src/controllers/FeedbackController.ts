import { FeedbackService } from '../services/FeedbackService';
import { message, status } from '../config/constant';
import winston from '../config/winston';

export class FeedbackController {
  public static getFeedback = async (req, res) => {
    const response = await FeedbackService.getAll();
    if (!response) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static async getFeedbackById(req, res) {
    const id = req.params.id;
    const response = await FeedbackService.getFeedbackById(id);
    if (!response) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  }

  public static insertFeedback = async (req, res) => {
    const dataBody = req.body;
    dataBody.image = [];
    req.files.forEach((element) => {
      dataBody.image.push(element.filename);
    });
    const response = await FeedbackService.insertFeedback(dataBody);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.CREATED_DESCRIPTION_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static updateFeedback = async (req, res) => {
    const dataBody = req.body;
    if (req.files && req.files.length !== 0) {
      dataBody.image = [];
      req.files.forEach((element) => {
        dataBody.image.push(element.filename);
      });
    }
    const response = await FeedbackService.updateFeedback(req.params.id, dataBody);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.UPDATE_DESCRIPTION_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static DeleteFeedback = async (req, res) => {
    const response = await FeedbackService.DeleteFeedback(req.params.id);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.DELETE_DESCRIPTION_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };
}
