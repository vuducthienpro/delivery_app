import { OrderService } from '../services/OrderService';
import { message, status } from '../config/constant';

export class OrderController {
  public static getAllOrder = async (req, res) => {
    const orders = await OrderService.getAllOrder();
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
  }

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
    const request = req.body;
    const newOrder = await OrderService.createOrder(request);
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
  }

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
        const order = await OrderService.findAndUpdateOrder(req.params.id, request, {new: true});
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
  }

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
  }
}