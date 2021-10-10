import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getCategoryByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const insertProductSchema = [
  check('category_id')
    .notEmpty()
    .withMessage(VALIDATE.ID_CATEGORY_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_CATEGORY_INVALID),
  check('name')
    .notEmpty()
    .withMessage(VALIDATE.NAME_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.NAME_NOT_INVALID),
  check('price')
    .notEmpty()
    .withMessage(VALIDATE.PRICE_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PRICE_INVALID),
  check('status')
    .notEmpty()
    .withMessage(VALIDATE.STATUS_EMPTY)
    .isIn([0, 1])
    .withMessage(VALIDATE.STATUS_INVALID),
  check('quantity')
    .notEmpty()
    .withMessage(VALIDATE.NUMBER_PRODUCT_EMPTY)
    .isInt()
    .withMessage(VALIDATE.NUMBER_PRODUCT_INVALID),
  check('description')
    .notEmpty()
    .withMessage(VALIDATE.DESCRIPTION_EMPTY)
    .isString()
    .withMessage(VALIDATE.DESCRIPTION_INVALID),
];

const updateProductSchema = [
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
  check('price')
    .notEmpty()
    .withMessage(VALIDATE.PRICE_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PRICE_INVALID),
  check('status')
    .notEmpty()
    .withMessage(VALIDATE.STATUS_EMPTY)
    .isIn([0, 1])
    .withMessage(VALIDATE.STATUS_INVALID),
  check('quantity')
    .notEmpty()
    .withMessage(VALIDATE.NUMBER_PRODUCT_EMPTY)
    .isInt()
    .withMessage(VALIDATE.NUMBER_PRODUCT_INVALID),
  check('description')
    .notEmpty()
    .withMessage(VALIDATE.DESCRIPTION_EMPTY)
    .isString()
    .withMessage(VALIDATE.DESCRIPTION_INVALID),
];

const deleteCategoryByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export {
  getCategoryByIdSchema,
  insertProductSchema,
  updateProductSchema,
  deleteCategoryByIdSchema,
};
