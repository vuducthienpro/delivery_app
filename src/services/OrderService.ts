import Order, { OrderDocument } from '../models/Order';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';

export class OrderService {
  public static getAllOrder = () => {
    return Order.find();
  }

  public static getOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.findById(query);
  }

  public static createOrder = async (input: DocumentDefinition<OrderDocument>) => {
    return Order.create(input);
  }

  public static findAndUpdateOrder = (query: FilterQuery<OrderDocument>, update: UpdateQuery<OrderDocument>, options: QueryOptions) => {
    return Order.findOneAndUpdate(query, update, options);
  }

  public static deleteOrder = (query: FilterQuery<OrderDocument>) => {
    return Order.deleteOne(query);
  }
}
