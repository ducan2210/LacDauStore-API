import express from 'express';
import { createPaymentUrl } from '../controllers/payment.controller';


const router = express.Router();

// Tạo URL thanh toán
router.post('/CreatePaymentUrl', createPaymentUrl);

export default router;
