import PackService from './../services/PackService';
export default class PackController {
  public static async createPack(req, res, next) {
    try {
      const data = await PackService.createPack(req.body);
      return res.json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.json({ error });
    }
  }
  public static getListPack = async (req, res, next) => {
    try {
      const data = await PackService.getListPack(req.query.page, req.query.pageSize);
      return res.json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.json({ error });
    }
  };
}
