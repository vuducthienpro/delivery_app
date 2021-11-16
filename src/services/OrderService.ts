import Order, { OrderDocument } from '../models/Order';
import Product from '../models/Product';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';
import { CreatePurchaseOrder, CreateShipOrder } from './../interface/order.interface';
import { EOrderType, EOrderStatus } from './../constant/order.status';
export class OrderService {
  public static getAllOrder = async (query: FilterQuery<OrderDocument>) => {
    let data: any;
    let limit: any;
    let offset: any;
    if (!query.name) {
      data = '';
    } else {
      data = query.name;
    }
    if (!query.limit) {
      limit = 0;
    } else {
      limit = Number(query.limit);
    }
    if (!query.offset) {
      offset = 0;
    } else {
      offset = Number(query.limit);
    }
    return Order.find().populate('products').populate('user').skip(offset).limit(limit);
  };

  public static getOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.findById(query).populate('products').populate('user');
  };

  public static historyOrder = (userId, query: FilterQuery<OrderDocument>) => {
    let data: any;
    let limit: any;
    let offset: any;
    if (!query.name) {
      data = '';
    } else {
      data = query.name;
    }
    if (!query.limit) {
      limit = 0;
    } else {
      limit = Number(query.limit);
    }
    if (!query.offset) {
      offset = 0;
    } else {
      offset = Number(query.limit);
    }
    return Order.find({ users: [userId] })
      .populate('products')
      .skip(offset)
      .limit(limit)
      .sort({ created_at: -1 });
  };

  public static createOrder = async (input: DocumentDefinition<OrderDocument>) => {
    const product = await Product.findOne({ name: input.name }).exec();
    if (!product) throw 'product not exit';
    const oderCreate = await Order.create(input);
    const arrProduct = oderCreate.products;
    arrProduct.push(product._id);
    const arrUser = oderCreate.users;
    // arrUser.push(input.user_id);
    await Order.findOneAndUpdate({ _id: oderCreate._id }, { products: arrProduct, users: arrUser });
    return oderCreate;
  };

  public static findAndUpdateOrder = (query: FilterQuery<OrderDocument>, update: UpdateQuery<OrderDocument>, options: QueryOptions) => {
    return Order.findOneAndUpdate(query, update, options);
  };

  public static deleteOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.deleteOne(query);
  };
  public static createPurchaseOrder = async (userId: string, data: CreatePurchaseOrder): Promise<any> => {
    const products = await Promise.all(
      data.products.map((product) => {
        return Product.create({
          url: product.url,
          name: product.name,
          quantity: product?.quantity || 0,
          customerNote: product.note,
        });
      }),
    );
    const orderDetial = await Order.create({
      user: userId,
      ...data,
      products: products.map((pr) => pr._id),
      quantity: data.products.reduce((a, b) => {
        return a + b.quantity;
      }, 0),
    });
    return orderDetial;
  };
  public static createShipOrder = async (userId: string, data: CreateShipOrder) => {
    const products = await Promise.all(
      data.products.map((product) => {
        return Product.create({
          image: product.image,
          name: product.name,
          quantity: product.quantity,
          customerNote: product.note,
        });
      }),
    );
    const quatity = data.products.reduce((a, b) => {
      return a + b.quantity;
    }, 0);
    const orderDetial = await Order.create({
      user: userId,
      ...data,
      orderType: EOrderType.SHIP_ORDER,
      products: products.map((pr) => pr._id),
      quantity: isNaN(quatity) ? 0 : quatity,
    });
    return orderDetial;
  };
  public static historyOrderUser = async (userId: string, page: number = 1, limit: number = 10) => {
    const listOrder = await Order.find({
      user: userId,
    }).sort(['updated_at', -1]);
    return listOrder;
  };
  public static updateDeliveryDateTime = async (userId: string, orderId: string, date: Date, time: string) => {
    return Order.findByIdAndUpdate(orderId, {
      deliveryDate: date,
      deliveryTime: time,
      status: EOrderStatus.DECIED_DELIVERY_DATE_TIME,
    });
  };
  public static updateStatusOrder = async (orderId: string, status: string) => {
    if ((Object as any).values(EOrderStatus).includes(status)) {
      return Order.findByIdAndUpdate(orderId, {
        status,
      });
    }
  };
}
