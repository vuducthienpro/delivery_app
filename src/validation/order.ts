import { check } from 'express-validator';
import { VALIDATE } from '../config/constantValidate';

const getOrderByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

const insertOrderSchema = [
  check('customer_id')
    .notEmpty()
    .withMessage(VALIDATE.CUSTOMER_ID_EMPTY)
    .isString()
    .withMessage(VALIDATE.CUSTOMER_ID_INVALID),
  check('status')
    .notEmpty()
    .withMessage(VALIDATE.STATUS_EMPTY)
    .isInt()
    .withMessage(VALIDATE.STATUS_INVALID),
  check('quantity')
    .notEmpty()
    .withMessage(VALIDATE.QUANTITY_EMPTY)
    .isInt()
    .withMessage(VALIDATE.QUANTITY_INVALID),
  check('total_price')
    .notEmpty()
    .withMessage(VALIDATE.TOTAL_PRICE_EMPTY)
    .isFloat()
    .withMessage(VALIDATE.TOTAL_PRICE_INVALID),
  check('payment_method')
    .notEmpty()
    .withMessage(VALIDATE.PAYMENT_METHOD_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PAYMENT_METHOD_INVALID),
  check('transport_method')
    .notEmpty()
    .withMessage(VALIDATE.TRANSPORT_METHOD_EMPTY)
    .isInt()
    .withMessage(VALIDATE.TRANSPORT_METHOD_INVALID),
  check('delivery_date')
    .isISO8601()
    .toDate()
    .withMessage(VALIDATE.DELIVERY_DATE_INVALID),
];

const updateOrderSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
  check('customer_id')
    .notEmpty()
    .withMessage(VALIDATE.CUSTOMER_ID_EMPTY)
    .isString()
    .withMessage(VALIDATE.CUSTOMER_ID_INVALID),
  check('status')
    .notEmpty()
    .withMessage(VALIDATE.STATUS_EMPTY)
    .isInt()
    .withMessage(VALIDATE.STATUS_INVALID),
  check('quantity')
    .notEmpty()
    .withMessage(VALIDATE.QUANTITY_EMPTY)
    .isInt()
    .withMessage(VALIDATE.QUANTITY_INVALID),
  check('total_price')
    .notEmpty()
    .withMessage(VALIDATE.TOTAL_PRICE_EMPTY)
    .isFloat()
    .withMessage(VALIDATE.TOTAL_PRICE_INVALID),
  check('payment_method')
    .notEmpty()
    .withMessage(VALIDATE.PAYMENT_METHOD_EMPTY)
    .isInt()
    .withMessage(VALIDATE.PAYMENT_METHOD_INVALID),
  check('transport_method')
    .notEmpty()
    .withMessage(VALIDATE.TRANSPORT_METHOD_EMPTY)
    .isInt()
    .withMessage(VALIDATE.TRANSPORT_METHOD_INVALID),
  check('delivery_date')
    .isISO8601()
    .toDate()
    .withMessage(VALIDATE.DELIVERY_DATE_INVALID),
];

const deleteOrderByIdSchema = [
  check('id')
    .notEmpty()
    .withMessage(VALIDATE.ID_NOT_EMPTY)
    .isString()
    .withMessage(VALIDATE.ID_NOT_INVALID),
];

export {
  getOrderByIdSchema,
  insertOrderSchema,
  updateOrderSchema,
  deleteOrderByIdSchema,
};
