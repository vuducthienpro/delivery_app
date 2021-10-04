import { check, body, param } from 'express-validator';

const getCategoryByIdSchema = [
  check('id').isEmail().withMessage('test err'),
  // check('username1').isEmail(),
  body('password').isLength({ min: 5 }),
];

const insertCategorySchema = [
  check('name').notEmpty().withMessage('name không được để trống'),
  check('name').isString().withMessage('Tên phải là chuỗi'),
  body('username').isEmail(),
];

export {
  getCategoryByIdSchema,
  insertCategorySchema,
};