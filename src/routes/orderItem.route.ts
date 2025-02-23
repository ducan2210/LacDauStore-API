import express from 'express';

import {authenticateToken} from '../middleware/auth.middleware';
import {createOrderItem} from '../controllers/orderItem.controller';
const router = express.Router();

router.post('/CreateOrderItem', authenticateToken, createOrderItem);

export default router;
