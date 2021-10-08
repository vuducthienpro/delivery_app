import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getCustomerByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const insertCustomerSchema = [
  check('name')
    .notEmpty()
    .withMessage(VALIDATE.NAME_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.NAME_NOT_INVALID),
  check('email')
    .notEmpty()
    .withMessage(VALIDATE.EMAIL_NOT_EMPTY)
    .isEmail()
    .withMessage(VALIDATE.EMAIL_INVALID),
  check('phone')
    .notEmpty()
    .withMessage(VALIDATE.PHONE_NOT_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PHONE_INVALID),
  check('address')
    .notEmpty()
    .withMessage(VALIDATE.ADDRESS_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ADDRESS_INVALID),
];

const updateCustomerSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
  check('name')
    .notEmpty()
    .withMessage(VALIDATE.NAME_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.NAME_NOT_INVALID),
  check('email')
    .notEmpty()
    .withMessage(VALIDATE.EMAIL_NOT_EMPTY)
    .isEmail()
    .withMessage(VALIDATE.EMAIL_INVALID),
  check('phone')
    .notEmpty()
    .withMessage(VALIDATE.PHONE_NOT_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PHONE_INVALID),
  check('address')
    .notEmpty()
    .withMessage(VALIDATE.ADDRESS_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ADDRESS_INVALID),
];

const deleteCustomerByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export {
  getCustomerByIdSchema,
  insertCustomerSchema,
  updateCustomerSchema,
  deleteCustomerByIdSchema,
};
