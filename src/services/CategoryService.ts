import Category, { CategoryDocument } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import winston from '../config/winston';

export class CategoryService {
  public static getAll = async (query: FilterQuery<CategoryDocument>) => {
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
    return await Category.find({ name: { $regex: '.*' + data + '.*' } })
      .populate('products')
      .skip(offset)
      .limit(limit);
  };

  public static getCategoryById = (id: FilterQuery<CategoryDocument>) => {
    return Category.findById(id).populate('products');
  };

  public static insertCategory = async (dataBody: DocumentDefinition<CategoryDocument>) => {
    const category = await Category.find({ name: dataBody.name }).exec();
    if (category.length === 0) {
      return Category.create(dataBody);
    }
  };

  public static updateCategory = async (id: FilterQuery<CategoryDocument>, dataBody: UpdateQuery<CategoryDocument>) => {
    const category = await Category.findById(id).exec();
    if (category) {
      await Category.updateOne({ _id: id }, dataBody);
      return dataBody;
    }
  };

  public static DeleteCategory = async (id: FilterQuery<CategoryDocument>) => {
    const category = await Category.findById(id).exec();
    if (category) {
      await Category.deleteOne({ _id: id });
      return category;
    }
  };
}
