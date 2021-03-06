import { CategoryService } from '../services/CategoryService';
import { message, status } from '../config/constant';
import winston from '../config/winston';
export class CategoryController {
  public static getCategory = async (req, res) => {
    const query = req.query;
    const response = await CategoryService.getAll(query);
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

  public static async getCategoryById(req, res) {
    const id = req.params.id;
    const response = await CategoryService.getCategoryById(id);
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

  public static insertCategory = async (req, res) => {
    const dataBody = req.body;
    dataBody.image = [];
    req.files.forEach((element) => {
      dataBody.image.push(element.filename);
    });
    const response = await CategoryService.insertCategory(dataBody);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.CREATED_CATEGORY_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static updateCategory = async (req, res) => {
    const dataBody = req.body;
    if (req.files && req.files.length !== 0) {
      dataBody.image = [];
      req.files.forEach((element) => {
        dataBody.image.push(element.filename);
      });
    }
    const response = await CategoryService.updateCategory(req.params.id, dataBody);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.UPDATE_CATEGORY_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static DeleteCategory = async (req, res) => {
    const response = await CategoryService.DeleteCategory(req.params.id);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.DELETE_CATEGORY_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };
}
