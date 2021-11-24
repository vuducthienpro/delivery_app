import { ProductService } from '../services/ProductService';
import { message, status } from '../config/constant';
import winston from '../config/winston';

export class ProductController {
  public static getCategory = async (req, res, next) => {
    const query = req.query;
    const response = await ProductService.getAll(query);
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

  public static async getProductById(req, res) {
    const id = req.params.id;
    const response = await ProductService.getProductById(id);
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

  public static insertProduct = async (req, res, next) => {
    const dataBody = req.body;
    dataBody.image = [];
    req.files.forEach((element) => {
      dataBody.image.push(element.filename);
    });
    const response = await ProductService.insertProduct(dataBody);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.CREATED_PRODUCT_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };

  public static updateProduct = async (req, res, next) => {
    try {
      const response = await ProductService.updateProduct(req.params.id, req.body);
      if (!response) {
        return res.json({
          status: status.BAD_REQUEST,
          message: message.UPDATE_PRODUCT_FALSE,
        });
      }
      return res.json({
        status: status.OK,
        data: response,
      });
    } catch (error) {
      return res.json({
        status: status.BAD_REQUEST,
        error,
      });
    }
  };

  public static DeleteProduct = async (req, res, next) => {
    const response = await ProductService.DeleteProduct(req.params.id);
    if (!response) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.DELETE_PRODUCT_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: response,
    });
  };
  public static updateStatusProduct = async (req, res, next) => {
    try {
      const data = await ProductService.updateStatusProduct(req.params.id, req.body.status);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      return res.json({
        status: status.OK,
        error,
      });
    }
  };
  public static addPackage= async(req,res,next)=>{
    try {
      const result = await ProductService.addPackage(req.params.id,req.body.packageId);
      return res.json({
        status: status.OK,
        data:result,
      });
    } catch (error) {
      return res.json({
        status: status.OK,
        error,
      });
    }
  }
}
