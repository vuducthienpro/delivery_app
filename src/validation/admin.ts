import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getAdminByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const registerAdminSchema = [
  check('username')
    .notEmpty()
    .withMessage(VALIDATE.USERNAME_EMPTY)
    .isString()
    .withMessage(VALIDATE.USERNAME_INVALID),
  check('password')
    .notEmpty()
    .withMessage(VALIDATE.PASSWORD_EMPTY)
    .isString()
    .isLength({ min: 4, max: 15 })
    .withMessage(VALIDATE.PASSWORD_INVALID),
];

const loginAdminSchema = [
  check('username')
    .notEmpty()
    .withMessage(VALIDATE.USERNAME_EMPTY)
    .isString()
    .withMessage(VALIDATE.USERNAME_INVALID),
  check('password')
    .notEmpty()
    .withMessage(VALIDATE.PASSWORD_EMPTY)
    .isString()
    .isLength({ min: 4, max: 15 })
    .withMessage(VALIDATE.PASSWORD_INVALID),
];

const changePasswordSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
  check('password')
    .notEmpty()
    .withMessage(VALIDATE.PASSWORD_EMPTY)
    .isString()
    .isLength({ min: 4, max: 15 })
    .withMessage(VALIDATE.PASSWORD_INVALID),
];

const deleteAdminByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export {
  getAdminByIdSchema,
  registerAdminSchema,
  loginAdminSchema,
  changePasswordSchema,
  deleteAdminByIdSchema,
};
