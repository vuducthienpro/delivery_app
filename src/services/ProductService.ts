import Product, { ProductDocument } from '../models/Product';
import Category, { CategoryDocument } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import winston from '../config/winston';

export class ProductService {
  public static getAll = (query: FilterQuery<ProductDocument>) => {
    // let dataQuery = {};
    // if (query.category_id) {
    //   dataQuery.category_id = query.category_id;
    // }
    // const dataQuery = {
    //   category_id: query.category_id ? query.category_id : undefined,
    // };
    return Product.find();
  }

  public static getProductById = (id: FilterQuery<CategoryDocument>) => {
    return Product.findById(id);
  }

  public static insertProduct = async (dataBody: DocumentDefinition<ProductDocument>) => {
    const product = await Product.find({ name: dataBody.name }).exec();
    if (product.length === 0) {
      const productCreate = await Product.create(dataBody);
      const category: any = await Category.findById(dataBody.category_id).exec();
      const arr = category.products;
      arr.push(productCreate._id);
      await Category.findOneAndUpdate({ _id: category._id }, { products: arr });
      return productCreate;
    }
  }

  public static updateProduct = async (id: FilterQuery<ProductDocument>, dataBody: UpdateQuery<ProductDocument>) => {
    const product = await Product.findById(id).exec();
    if (product) {
      await Product.updateOne({ _id: id }, dataBody);
      return dataBody;
    }
  }

  public static DeleteProduct = async (id: FilterQuery<ProductDocument>) => {
    const product = await Product.findById(id).exec();
    if (product) {
      await Product.deleteOne({ _id: id });
      return product;
    }
  }
}
