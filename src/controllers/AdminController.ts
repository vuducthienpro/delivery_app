import { AdminService } from '../services/AdminService';
import { HEADER_JWT_ALG, message, status } from '../config/constant';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import winston from '../config/winston';
export class AdminController {
  public static login = async (req, res) => {
    try {
      const username = req.body.username;
      const admin = await AdminService.getAdminByUsername({ username });
      const validPassword = await bcrypt.compare(req.body.password, admin.password);
      if (admin && validPassword) {
        const token = jwt.sign(
          {
            id: admin.id,
          },
          HEADER_JWT_ALG,
          { expiresIn: '7d' },
        );
        res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
        await AdminService.findAndUpdateAdmin({ username }, { token }, { new: true });
        return res.json({
          status: status.OK,
          data: {
            token,
            username,
          },
        });
      } else {
        return res.json({
          status: status.NO_CONTENT,
          data: message.LOGIN_FALSE,
        });
      }
    } catch (error) {
      winston.info(error);
    }
  };

  public static getAllAdmin = async (req, res) => {
    const admins = await AdminService.getAllAdmin();
    if (!admins) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: admins,
    });
  };

  public static async getAdminById(req, res) {
    const id = req.params.id;
    const admin = await AdminService.getAdmin(id);
    if (!admin) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    }
    return res.json({
      status: status.OK,
      data: admin,
    });
  }

  public static registerAdmin = async (req, res) => {
    const request = req.body;
    const username = request.username;
    const admin = await AdminService.getAdminByUsername({ username });
    if (!admin) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
      const newAdmin = await AdminService.createAdmin(request);
      if (!newAdmin) {
        return res.json({
          status: status.BAD_REQUEST,
          message: message.CREATED_ORDER_FALSE,
        });
      }
      const token = jwt.sign(
        {
          id: newAdmin.id,
        },
        HEADER_JWT_ALG,
        { expiresIn: '7d' },
      );
      res.cookie('jwt', token, { httpOnly: true, secure: true, maxAge: 3600000 });
      await AdminService.findAndUpdateAdmin({ username: newAdmin.username }, { token }, { new: true });
      return res.json({
        status: status.OK,
        data: token,
      });
    } else {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.REGISTER_FALSE,
      });
    }
  };

  public static changePassword = async (req, res, next) => {
    const id = req.params.id;
    const dataAdmin = AdminService.getAdmin(id);
    if (!dataAdmin) {
      return res.json({
        status: status.NOT_FOUND,
        message: message.NOT_FOUND,
      });
    } else {
      let password = req.body.password;
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      const token = jwt.sign(
        {
          id,
        },
        HEADER_JWT_ALG,
        { expiresIn: '7d' },
      );
      const admin = await AdminService.findAndUpdateAdmin(id, { password, token }, { new: true });
      if (!admin) {
        return res.json({
          status: status.NO_CONTENT,
          message: message.UPDATE_ORDER_FALSE,
        });
      } else {
        return res.json({
          status: status.OK,
          data: admin,
        });
      }
    }
  };

  public static deleteAdmin = async (req, res, next) => {
    try {
      const id = req.params.id;
      const admin = await AdminService.deleteAdmin(id);

      return res.json({
        status: status.OK,
        data: admin,
      });
    } catch (error) {
      return res.json({
        status: status.BAD_REQUEST,
        message: message.DELETE_FALSE,
      });
    }
  };

  public static logout = async (req, res) => {
    try {
      const token = req.token;
      winston.info({ kq: token });
      await AdminService.findAndUpdateAdmin({ token }, { token: null }, { new: true });
      return res.json({
        status: status.OK,
        message: message.LOGOUT_SUCCESS,
      });
    } catch (error) {
      winston.info(error);
      return res.json({
        status: status.OK,
        message: message.LOGOUT_FALSE,
      });
    }
  };
}
