import Category, { CategoryDocument } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import winston from '../config/winston';

export class CategoryService {
  public static getAll = () => {
    return Category.find().populate('products');
  }

  public static insertCategory = async (dataBody: DocumentDefinition<CategoryDocument>) => {
    const category = await Category.find({ name: dataBody.name }).exec();
    if (category.length === 0) {
      return Category.create(dataBody);
    }
  }

  public static updateCategory = async (id: FilterQuery<CategoryDocument>, dataBody: UpdateQuery<CategoryDocument>) => {
    const category = await Category.findById(id).exec();
    if (category) {
      await Category.updateOne(dataBody);
      return dataBody;
    }
  }

  public static DeleteCategory = async (id: FilterQuery<CategoryDocument>) => {
    const category = await Category.findById(id).exec();
    if (category) {
      await Category.deleteOne({ id });
      return category;
    }
  }
}