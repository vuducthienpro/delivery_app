import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { HEADER_JWT_ALG, message } from '../config/constant';
import winston from '../config/winston';

const authAdmin = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (token) {
      token = token.split(' ')[1];
      const verifyToken: any = jwt.verify(token, HEADER_JWT_ALG);
      const id = verifyToken.id;
      const user = await Admin.findById(id).exec();
      if (user) {
        req.user = user;
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

export default authAdmin;
