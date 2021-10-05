import { ProductService } from '../services/ProductService';
import { message, status } from '../config/constant';
import winston from '../config/winston';

export class ProductController {
  public static getCategory = async (req, res, next) => {
    const query = req.query;
    const data = await ProductService.getAll(query);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      data,
    });
  }

  public static insertProduct = async (req, res, next) => {
    const dataBody = req.body;
    if (req.files) {
      winston.info(req.files);
      dataBody.image = [];
      req.files.forEach((element) => {
        dataBody.image.push(element.originalname);
      });
    }
    const data = await ProductService.insertProduct(dataBody);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      data,
    });
  }

  public static updateProduct = async (req, res, next) => {
    const dataBody = req.body;
    if (req.files) {
      dataBody.image = [];
      req.files.forEach((element) => {
        dataBody.image.push(element.originalname);
      });
    }
    const data = await ProductService.updateProduct(req.params.id, dataBody);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      data,
    });
  }

  public static DeleteProduct = async (req, res, next) => {
    const data = await ProductService.DeleteProduct(req.params.id);
    if (!data) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      data,
    });
  }
}
