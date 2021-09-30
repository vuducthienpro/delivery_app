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
}
