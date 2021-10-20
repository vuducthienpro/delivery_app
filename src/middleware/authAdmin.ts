import jwt from 'jsonwebtoken';
import Admin from '../models/Admin';
import { HEADER_JWT_ALG, message } from '../config/constant';
import winston from '../config/winston';

const authAdmin = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
    }
    if (req.cookies.jwt) {
      winston.info(1111);
      token = req.cookies.jwt;
    }
    winston.info(req.cookies);
    if (token) {
      const verifyToken: any = jwt.verify(token, HEADER_JWT_ALG);
      const id = verifyToken.id;
      const user = await Admin.findById(id).exec();
      if (user) {
        req.user = user;
        req.token = token;
        next();
      } else {
        res.json({
          status: 403,
          message: message.ERROR_TOKEN,
        });
      }
    } else {
      res.json({
        status: 403,
        message: message.ERROR_TOKEN,
      });
    }
  } catch (error) {
    winston.info(error);
    res.json({
      status: 403,
      message: message.ERROR_TOKEN,
    });
  }
};

export default authAdmin;
