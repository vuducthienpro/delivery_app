import Banner, { BannerDocument } from '../models/Banner';
import { FilterQuery, DocumentDefinition, UpdateQuery } from 'mongoose';

export class BannerService {
  public static getAllBanner = () => {
    return Banner.find();
  }

  public static getBanner = (query: FilterQuery<BannerDocument>) => {
    return Banner.findOne(query);
  }

  public static createBanner = (input: DocumentDefinition<BannerDocument>) => {
    return Banner.create(input);
  }

  public static findAndUpdateBanner = (
    query: FilterQuery<BannerDocument>,
    update: UpdateQuery<BannerDocument>,
    ) => {
      return Banner.findOneAndUpdate(query, update);
  }

  public static deleteBanner = (query: FilterQuery<BannerDocument>) => {
    return Banner.deleteOne(query);
  }
}