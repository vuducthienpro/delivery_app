import { Router } from 'express';
import { FeedbackController } from '../controllers/FeedbackController';
import upload from '../middleware/upload';
import { validateRequestSchema } from '../middleware/validate';
import {
  getFeedbackByIdSchema,
  insertFeedbackSchema,
  updateFeedbackSchema,
  deleteFeedbackByIdSchema,
} from '../validation/feedback';
import authAdminAndUser from '../middleware/authAdminAndUser';

const router = Router();

router.get('/', authAdminAndUser, FeedbackController.getFeedback);
router.get(
  '/:id',
  getFeedbackByIdSchema,
  validateRequestSchema,
  authAdminAndUser,
  FeedbackController.getFeedbackById,
);
router.post('/', upload.array('image', 5), insertFeedbackSchema, validateRequestSchema, authAdminAndUser, FeedbackController.insertFeedback);
router.put('/:id', upload.array('image', 5), updateFeedbackSchema, validateRequestSchema, authAdminAndUser, FeedbackController.updateFeedback);
router.delete('/:id', deleteFeedbackByIdSchema, validateRequestSchema, authAdminAndUser, FeedbackController.DeleteFeedback);

export default router;
