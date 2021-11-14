import { OrderService } from '../services/OrderService';
import { message, status } from '../config/constant';
import winston from '../config/winston';

export class OrderController {
  public static getAllOrder = async (req, res) => {
    const query = req.query;
    const orders = await OrderService.getAllOrder(query);
    if (!orders) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: orders,
    });
  };

  public static async getOrderById(req, res) {
    const id = req.params.id;
    const order = await OrderService.getOrder(id);
    if (!order) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: order,
    });
  }

  public static createOrder = async (req, res) => {
    try {
      const dataBody = req.body;
      dataBody.user_id = req.user._id;
      const newOrder = await OrderService.createOrder(dataBody);
      if (!newOrder) {
        return res.json({
          status: status.BAD_REQUEST,
          message: message.CREATED_ORDER_FALSE,
        });
      }
      return res.json({
        status: status.OK,
        data: newOrder,
      });
    } catch (err) {
      return res.json({
        status: 400,
        message: err,
      });
    }
  };

  public static updateOrder = async (req, res, next) => {
    const id = req.params.id;
    const dataOrder = OrderService.getOrder(id);
    if (!dataOrder) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    } else {
      const request = req.body;
      const order = await OrderService.findAndUpdateOrder(req.params.id, request, { new: true });
      if (!order) {
        return res.json({
          status: status.NO_CONTENT,
          message: message.UPDATE_ORDER_FALSE,
        });
      } else {
        return res.json({
          status: status.OK,
          data: order,
        });
      }
    }
  };

  public static deleteOrder = async (req, res, next) => {
    const order = await OrderService.deleteOrder(req.params.id);
    if (!order) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.DELETE_ORDER_FALSE,
      });
    }
    return res.json({
      status: status.OK,
      data: order,
    });
  };

  public static historyOrder = async (req, res, next) => {
    const query = req.query;
    const userId: any = req.user._id;
    const order = await OrderService.historyOrder(userId, query);
    if (!order) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: order,
    });
  };
  public static purchaseOrder = async (req, res, next) => {
    try {
      const userId: any = req.user?._id;
      const data = await OrderService.createPurchaseOrder(userId, req.body);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: status.BAD_REQUEST,
      });
    }
  };
  public static shipOrder = async (req, res, next) => {
    try {
      const data = await OrderService.createShipOrder(req.user._id, req.body);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: status.BAD_REQUEST,
      });
    }
  };
  public static historyOrderUser = async (req, res, next) => {
    try {
      const data = await OrderService.historyOrderUser(req.user._id, req.query.page, req.query.limt);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.status(500).json({
        status: status.BAD_REQUEST,
      });
    }
  };
  public static updateDeliveryDateTime= async (req,res,next)=>{
    try {
      const data = await OrderService.updateDeliveryDateTime(req.user._id,req.params.id,req.body.date,req.body.time);
      return res.json({
        status: status.OK,
        data,
      });
    }
    catch (error){
      res.json({
        error,
      });
    }
  }
}
