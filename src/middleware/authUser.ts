import jwt from 'jsonwebtoken';
import User from '../models/User';
import { HEADER_JWT_ALG, message } from '../config/constant';
import winston from '../config/winston';


const authUser = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    winston.info(token);
    if (token) {
      token = token.split(' ')[1];
      winston.info(token);
      const verifyToken: any = jwt.verify(token, HEADER_JWT_ALG);
      const id = verifyToken.id;
      winston.info(verifyToken.id);
      const user = await User.findById(id).exec();
      winston.info(user);
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

export default authUser;
