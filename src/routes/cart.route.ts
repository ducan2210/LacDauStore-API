import express from 'express';
import {
  addToCart,
  deleteItemInCart,
  deleteItemInCartAfterCheckOut,
  getCalculateCartTotal,
  getCartById,
  updateItemInCart,
} from '../controllers/cart.controller';
import {authenticateToken} from '../middleware/auth.middleware';
const router = express.Router();

router.post('/AddToCart', authenticateToken, addToCart);
router.get('/GetCartById', getCartById);
router.delete('/DeleteItemInCart', authenticateToken, deleteItemInCart);
router.put('/UpdateItemInCart', authenticateToken, updateItemInCart);
router.get('/GetCalculateCartTotal', getCalculateCartTotal);
router.delete(
  '/DeleteItemInCartAfterCheckOut',
  authenticateToken,
  deleteItemInCartAfterCheckOut,
);

export default router;
