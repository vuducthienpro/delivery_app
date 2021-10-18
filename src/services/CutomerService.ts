import Customer, { CustomerDocument } from '../models/Customer';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';

export class CustomerService {
  public static getAllCutomer = () => {
    return Customer.find();
  };

  public static getCutomer = (query: FilterQuery<CustomerDocument>) => {
    return Customer.findById(query);
  };

  public static createCutomer = (input: DocumentDefinition<CustomerDocument>) => {
    return Customer.create(input);
  };

  public static findAndUpdateCutomer = (query: FilterQuery<CustomerDocument>, update: UpdateQuery<CustomerDocument>, options: QueryOptions) => {
    return Customer.findOneAndUpdate(query, update, options);
  };

  public static deleteCutomer = (query: FilterQuery<CustomerDocument>) => {
    return Customer.deleteOne(query);
  };
}
