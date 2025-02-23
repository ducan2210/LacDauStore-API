import express from 'express';
import { getPromotion, getPromotionByCodeActive } from '../controllers/promotion.controller';


const router = express.Router()

router.get('/GetPromotion', getPromotion)
router.get('/GetPromotionByCode', getPromotionByCodeActive)

export default router;