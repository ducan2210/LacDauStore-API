import express from 'express';
import { authenticateToken } from '../middleware/auth.middleware';
import { addToWishList, deleteItemInWishList, getWishListById } from '../controllers/wishlist.controller';

const router = express.Router();
router.get('/GetWishListById', getWishListById);
router.post('/AddToWishList', authenticateToken, addToWishList);
router.delete('/DeleteItemInWishList', authenticateToken, deleteItemInWishList);

export default router;