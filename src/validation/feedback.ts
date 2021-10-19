import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getFeedbackByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const insertFeedbackSchema = [
  check('description')
    .notEmpty()
    .withMessage(VALIDATE.DESCRIPTION_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.DESCRIPTION_NOT_INVALID),
];

const updateFeedbackSchema = [
  check('description')
    .notEmpty()
    .withMessage(VALIDATE.DESCRIPTION_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.DESCRIPTION_NOT_INVALID),
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const deleteFeedbackByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export {
  getFeedbackByIdSchema,
  insertFeedbackSchema,
  updateFeedbackSchema,
  deleteFeedbackByIdSchema,
};
