import Banner, { BannerDocument } from '../models/Banner';
import { FilterQuery, DocumentDefinition, UpdateQuery, QueryOptions } from 'mongoose';

export class BannerService {
  public static getAllBanner = () => {
    return Banner.find();
  }

  public static getBanner = (query: FilterQuery<BannerDocument>) => {
    return Banner.findById(query);
  }

  public static createBanner = (input: DocumentDefinition<BannerDocument>) => {
    return Banner.create(input);
  }

  public static findAndUpdateBanner = (
    query: FilterQuery<BannerDocument>,
    update: UpdateQuery<BannerDocument>,
    options: QueryOptions,
    ) => {
      return Banner.findOneAndUpdate(query, update, options);
  }

  public static deleteBanner = (query: FilterQuery<BannerDocument>) => {
    return Banner.deleteOne(query);
  }
}