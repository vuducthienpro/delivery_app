import { OrderService } from '../services/OrderService';
import { message, status } from '../config/constant';
import winston from '../config/winston';
import { HistoryNotificationService } from './../services/historyNotificationService';
import { sendNotificationToMobile } from './../common/notification.helper';
import { EHistoryNotificationType } from './../models/history-notification';
import { ProductService } from './../services/ProductService';

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
    let totalPrice = 0;
    let fixedTotalWeight = 0;
    let fixedTotalFee = 0;
    order.products.forEach((product) => {
      totalPrice += product.totalPrice ? product.totalPrice : 0;
      fixedTotalWeight += product.fixedWeight ? product.fixedWeight : 0;
    });
    totalPrice *= 225;
    fixedTotalWeight *= 400000;
    fixedTotalFee = totalPrice + fixedTotalWeight + (order.extraShipFee ? order.extraShipFee : 0);
    order.fixedTotalFee = fixedTotalFee ;
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
    try {
      const id = req.params.id;
      console.log('id', id);
      const dataOrder = OrderService.getOrder(id);
      if (!dataOrder) {
        return res.json({
          status: status.NOT_FOUND,
          message: message.NOT_FOUND,
        });
      } else {
        const request = req.body;
        const order = await OrderService.findAndUpdateOrder(id, request, { new: true });
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
    } catch (error) {
      return res.json({
        status: status.OK,
        error,
      });
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
      console.log(req.user);
      const data = await OrderService.createPurchaseOrder(userId, req.body, req.user?.name);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: status.BAD_REQUEST,
        error,
      });
    }
  };
  public static shipOrder = async (req, res, next) => {
    try {
      const data = await OrderService.createShipOrder(req.user._id, req.body, req.user?.name);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: status.BAD_REQUEST,
      });
    }
  };
  public static historyOrderUser = async (req, res, next) => {
    try {
      const data = await OrderService.historyOrderUser(req.user._id, req.query.page, req.query.limt);
      const orders = data.map((orderData) => {
        let totalPrice = 0;
        let fixedTotalWeight = 0;
        let fixedTotalFee = 0;
        orderData.products.forEach((product) => {
          totalPrice += product.totalPrice ? product.totalPrice : 0;
          fixedTotalWeight += product.fixedWeight ? product.fixedWeight : 0;
        });
        totalPrice *= 225;
        fixedTotalWeight *= 400000;
        fixedTotalFee = totalPrice + fixedTotalWeight + (orderData.extraShipFee ? orderData.extraShipFee : 0);
        orderData.fixedTotalFee = fixedTotalFee;
        return orderData;
      });
      console.log('orders',orders);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        status: status.BAD_REQUEST,
        error,
      });
    }
  };
  public static updateDeliveryDateTime = async (req, res, next) => {
    try {
      const data = await OrderService.updateDeliveryDateTime(req.user._id, req.params.id, req.body.date, req.body.time);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static updateStatusOrder = async (req, res, next) => {
    try {
      const data = await OrderService.updateStatusOrder(req.params.id, req.body.status);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static agreeDelivery = async (req, res, next) => {
    try {
      const data = await OrderService.agreeDelivery(req.params.id);
      return res.json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static sendNotificationMakePurchaseBill = async (req, res, next) => {
    try {
      const orderDetial = await OrderService.getOrder(req.params.id);
      if (!orderDetial) {
        return res.status(400).json({
          status: status.NOT_FOUND,
          message: 'order not found',
        });
      }
      console.log(orderDetial);
      sendNotificationToMobile({
        registration_ids: orderDetial.user.token,
        notification: {
          title: '購入明細を作成しました',
          body: 'ご依頼頂きました内容で購入明細を作成致しました。注文履歴から明細をご確認下さい。',
        },
        data: {
          id:orderDetial._id,
        },
      });
      await HistoryNotificationService.addHistory(EHistoryNotificationType.MAKE_PUSCHA_BILL, req.params.id);
      return res.status(200).json({
        status: status.OK,
        message: 'success',
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static sendNotificationFinishWeightMeasument = async (req, res, next) => {
    try {
      const orderDetial = await OrderService.getOrder(req.params.id);
      if (!orderDetial) {
        return res.status(400).json({
          status: status.NOT_FOUND,
          message: 'order not found',
        });
      }
      console.log(orderDetial);
      sendNotificationToMobile({
        registration_ids: orderDetial.user.token,
        notification: {
          title: '計量が完了致しました。',
          body: '配送をご依頼頂いたお荷物の計量が完了致しました。注文履歴から明細をご確認下さい。',
        },
        data: {
          id:orderDetial._id,
        },
      });
      await HistoryNotificationService.addHistory(EHistoryNotificationType.FINISH_WEIGHT_MEASUREMENT, req.params.id);
      return res.status(200).json({
        status: status.OK,
        message: 'success',
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static sendNotificationArrivedHN = async (req, res, next) => {
    try {
      const orderDetial = await OrderService.getOrder(req.params.id);
      if (!orderDetial) {
        return res.status(400).json({
          status: status.NOT_FOUND,
          message: 'order not found',
        });
      }
      console.log(orderDetial);
      sendNotificationToMobile({
        registration_ids: orderDetial.user.token,
        notification: {
          title: 'お荷物のお渡し準備が整いました。',
          body: '配送をご依頼頂いたお荷物のお渡し準備が整いました。注文履歴から配送希望日をご入力下さい。',
        },
        data: {
          id:orderDetial._id,
        },
      });
      await HistoryNotificationService.addHistory(EHistoryNotificationType.ARRIVED_IN_HANOI, req.params.id);
      return res.status(200).json({
        status: status.OK,
        message: 'success',
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static historyNotificationOrder = async (req, res, next) => {
    try {
      const data = await HistoryNotificationService.getList(req.params.id);
      return res.status(200).json({
        status: status.OK,
        data,
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  };
  public static deleteProductOrder = async (req, res, next) => {
    try {
      await OrderService.deleteProductOrder(req.params.id, req.body.id);
      await ProductService.DeleteProduct(req.body.id);
      return res.status(200).json({
        status: status.OK,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  };
  public static addProductToOrder = async (req, res, next) => {
    try {
      const data = await OrderService.addProductToOrder(req.params.id, req.body);
      return res.status(200).json({
        status: status.OK,
      });
    } catch (error) {
      console.log(error);
      res.json({
        error,
      });
    }
  };
}
