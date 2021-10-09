import jwt from 'jsonwebtoken';
import User from '../models/User';
import Admin from '../models/Admin';
import { HEADER_JWT_ALG, message } from '../config/constant';
import winston from '../config/winston';

const authAdminAndUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      const verifyToken: any = jwt.verify(token, HEADER_JWT_ALG);
      const id = verifyToken.id;
      const userAdmin = await Admin.findById(id).exec();
      const user = await User.findById(id).exec();
      if (user || userAdmin) {
        req.user = user ? user : userAdmin;
        next();
      } else {
        res.json({
          status: 'error',
          message: message.ERROR_TOKEN,
        });
      }
    } else {
      res.json({
        status: 'error',
        message: message.ERROR_TOKEN,
      });
    }
  } catch (error) {
    winston.info(error);
    res.json({
      status: 'error',
      message: message.ERROR_TOKEN,
    });
  }
};

export default authAdminAndUser;
