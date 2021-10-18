import Order, { OrderDocument } from '../models/Order';
import Product from '../models/Product';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';
import winston from '../config/winston';

export class OrderService {
  public static getAllOrder = async (query: FilterQuery<OrderDocument>) => {
    return Order.find().populate('products').populate('users');
  };

  public static getOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.findById(query);
  };

  public static createOrder = async (input: DocumentDefinition<OrderDocument>) => {
    const product = await Product.findOne({ name: input.name }).exec();
    if (!product) throw 'product not exit';
    const oderCreate = await Order.create(input);
    const arrProduct = oderCreate.products;
    arrProduct.push(product._id);
    const arrUser = oderCreate.users;
    arrUser.push(input.user_id);
    await Order.findOneAndUpdate({ _id: oderCreate._id }, { products: arrProduct, users: arrUser });
    return oderCreate;
  };

  public static findAndUpdateOrder = (query: FilterQuery<OrderDocument>, update: UpdateQuery<OrderDocument>, options: QueryOptions) => {
    return Order.findOneAndUpdate(query, update, options);
  };

  public static deleteOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.deleteOne(query);
  };
}
