import Pack from './../models/Pack';
export default class PackService {
  public static createPack = async (data) => {
    return Pack.create({ ...data });
  };
  public static getListPack = async (page: number, pageSize: number) => {
    return Pack.find({})
      .skip((page - 1) * pageSize)
      .limit(page)
      .sort({ created_at: -1 });
  };
  public static getDetial = async (id:string)=>{
    return Pack.findById(id);
  }
}
