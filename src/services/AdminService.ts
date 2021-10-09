import Admin, { AdminDocument } from '../models/Admin';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';

export class AdminService {
  public static getAllAdmin = () => {
    return Admin.find();
  };

  public static getAdminByUsername = (options: QueryOptions) => {
    return Admin.findOne(options);
  };

  public static getAdmin = (query: FilterQuery<AdminDocument>) => {
    return Admin.findById(query);
  };

  public static createAdmin = async (input: DocumentDefinition<AdminDocument>) => {
    return Admin.create(input);
  };

  public static findAndUpdateAdmin = (query: FilterQuery<AdminDocument>, update: UpdateQuery<AdminDocument>, options: QueryOptions) => {
    return Admin.findOneAndUpdate(query, update, options);
  };

  public static deleteAdmin = (query: FilterQuery<AdminDocument>) => {
    return Admin.findByIdAndRemove(query);
  };
}
