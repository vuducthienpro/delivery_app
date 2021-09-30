import Category, { CategoryDocument } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import winston from '../config/winston';

export class CategoryService {
  public static getAll = () => {
    return Category.find();
  }

  public static insertCategory = (dataBody: DocumentDefinition<CategoryDocument>) => {
    return Category.create(dataBody);
  }

  public static updateCategory = async (id: FilterQuery<CategoryDocument>, dataBody: UpdateQuery<CategoryDocument>) => {
    winston.info(id);
    winston.info(dataBody);
    const category = await Category.findById(id).exec();
    winston.info(category);
    if (category) {
      await Category.updateOne(dataBody);
      return dataBody;
    }
    // return Category.findOneAndUpdate(id, dataBody);
  }

  public static DeleteCategory = async (id: FilterQuery<CategoryDocument>) => {
    winston.info(id);
    const category = await Category.findById(id).exec();
    winston.info(category);
    if (category) {
      await Category.deleteOne(id);
      return category;
    }
  }
}