import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getCategoryByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const insertCategorySchema = [
  check('name')
    .notEmpty()
    .withMessage(VALIDATE.NAME_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.NAME_NOT_INVALID),
];

const updateCategorySchema = [
  check('name')
    .notEmpty()
    .withMessage(VALIDATE.NAME_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.NAME_NOT_INVALID),
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
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
  insertCategorySchema,
  updateCategorySchema,
  deleteCategoryByIdSchema,
};
