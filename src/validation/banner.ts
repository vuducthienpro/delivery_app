import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getBannerByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const updateBannerSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const deleteBannerByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export { getBannerByIdSchema, updateBannerSchema, deleteBannerByIdSchema };
