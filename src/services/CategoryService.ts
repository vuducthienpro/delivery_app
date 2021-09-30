import Category, { CategoryDocument  } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';

export class CategoryService {
  public static getAll = () => {
    return Category.find();
  };

  public static insertCategory = (dataBody: DocumentDefinition<CategoryDocument>) => {
    return 100;
  };
}