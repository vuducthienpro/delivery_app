import { CategoryService } from '../services/CategoryService';
import { message, status } from '../config/constant';

export class CategoryController {
  public static getCategory = async (req, res, next) => {
    const data = await CategoryService.getAll();
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND_BANNER,
      });
    }
    return res.json({
      data,
    });
  }

  public static insertCategory = async (req, res, next) => {
    const dataBody = req.body;
    if (req.files) {
      dataBody.image = [];
      req.files.forEach(element => {
        dataBody.image.push(element.originalname);
      });
    }
    const data = await CategoryService.insertCategory(dataBody);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND_BANNER,
      });
    }
    return res.json({
      data,
    });
  }

  public static updateCategory = async (req, res, next) => {
    const dataBody = req.body;
    const data = await CategoryService.updateCategory(req.params.id, dataBody);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND_BANNER,
      });
    }
    return res.json({
      data,
    });
  }

  public static DeleteCategory = async (req, res, next) => {
    const data = await CategoryService.DeleteCategory(req.params.id);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND_BANNER,
      });
    }
    return res.json({
      data,
    });
  }
}
