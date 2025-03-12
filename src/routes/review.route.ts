import uploadMultiple from './../middleware/cloudinary.middleware';
import {
  createReview,
  getReviewByProductID,
  uploadReviewImage,
} from './../controllers/review.controller';
import express from 'express';

const router = express.Router();

router.get('/GetReviewByProductID', getReviewByProductID);
router.post('/UploadReviewImage', uploadMultiple, uploadReviewImage);
router.post('/CreateReview', createReview);
export default router;
