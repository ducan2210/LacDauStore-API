import express from 'express';
import {authenticateToken} from '../middleware/auth.middleware';
import {
  createOrder,
  getOrderById,
  getOrderByUserId,
} from '../controllers/order.controller';
const router = express.Router();

router.post('/CreateOrder', authenticateToken, createOrder);
router.get('/GetOrderByUserId', getOrderByUserId);
router.get('/GetOrderById', getOrderById);

export default router;
