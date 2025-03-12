import {Request, Response} from 'express';
import Review from '../models/review.model';
import User from '../models/user.model';

export const uploadReviewImage = async (req: Request, res: Response) => {
  try {
    if (!req.files || (req.files as Express.Multer.File[]).length === 0) {
      res.status(400).json({message: 'No images provided'});
    }
    const imageUrls = (req.files as Express.Multer.File[]).map(
      file => (file as any).path,
    );
    res.status(200).json({imageUrls});
  } catch (error) {
    res.status(500).json({error: 'Error uploading images'});
  }
};

export const getReviewByProductID = async (req: Request, res: Response) => {
  try {
    const reviews = await Review.findAll({
      where: {
        product_id: req.query.product_id,
      },
      include: [
        {
          model: User,
        },
      ],
    });
    const total_review = reviews?.length || 0;
    const average_rating =
      total_review > 0
        ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
          total_review
        : 0;
    if (reviews) {
      const responseData = {
        reviews,
        total_review,
        average_rating,
      };
      res.status(200).json(responseData);
    } else {
      res.status(404).json({message: 'No review available'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching review'});
  }
};

export const createReview = async (req: Request, res: Response) => {
  try {
    const {product_id, user_id, rating, comment, photos} = req.body;
    const review = await Review.create({
      product_id: product_id,
      user_id: user_id,
      rating: rating,
      comment: comment,
      photos: photos,
    });
    res.status(201).json({
      message: 'Review created successfully',
      review: review,
    });
  } catch (error) {
    res.status(500).json({error: 'Error creating review'});
  }
};
