import Product, { ProductDocument } from '../models/Product';
import Category, { CategoryDocument } from '../models/Category';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';
import { EProductStatus } from './../constant/product.status';

export class ProductService {
  public static getAll = async (query: FilterQuery<ProductDocument>) => {
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
    // const limit: any = Number(query.limit) ? query.limit : 20;
    // const offset: any = Number(query.offset) ? query.offset : 0;
    // winston.info(typeof limit);
    // winston.info(typeof offset);
    return await Product.find({ name: { $regex: '.*' + data + '.*' } })
      .populate('pack')
      .skip(offset)
      .limit(limit)
      .sort({ created_at: -1 });
  };

  public static getProductById = (id: FilterQuery<CategoryDocument>) => {
    return Product.findById(id);
  };

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
  };

  public static updateProduct = async (id: FilterQuery<ProductDocument>, dataBody: UpdateQuery<ProductDocument>) => {
    const product = await Product.findById(id).exec();
    if (product) {
      await Product.updateOne({ _id: id }, dataBody);
      return dataBody;
    }
  };

  public static DeleteProduct = async (id: FilterQuery<ProductDocument>) => {
    const product = await Product.findById(id).exec();
    if (product) {
      await Product.deleteOne({ _id: id });
      return product;
    }
  };
  public static updateStatusProduct = async (productId: string, status: string) => {
    if ((Object as any).values(EProductStatus).includes(status)) {
      return Product.findByIdAndUpdate(productId, {
        status,
      });
    }
  };
  public static addPackage= async (productId:string,packageId:string)=>{
    return Product.findByIdAndUpdate(productId,{
      pack:packageId,
    })
  }
}
