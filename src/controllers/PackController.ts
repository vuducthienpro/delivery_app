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
      const countPack = await PackService.countPack();
      return res.json({
        status: 200,
        data,
        countDocuments: countPack,
      });
    } catch (error) {
      return res.json({ error });
    }
  };
  public static getDetialPack = async (req, res, next) => {
    try {
      const data = await PackService.getDetial(req.params.id);
      return res.json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
  public static updatePack = async (req, res, next) => {
    try {
      const data = await PackService.updatePack(req.params.id, req.body);
      return res.json({
        status: 200,
        data,
      });
    } catch (error) {
      return res.status(500).json({ error });
    }
  };
}
