import express from 'express';
import {
  getAllProduct,
  getAllProductAvailability,
  getProductByCategoryID,
  getProductById,
  searchProduct,
  getProductDetailByID,
  getProductRecommend,
} from '../controllers/product.controller';

const router = express.Router();

router.get('/GetAllProduct', getAllProduct);
router.get('/GetSearchProduct', searchProduct);
router.get('/GetAllProductAvailability', getAllProductAvailability);
router.get('/GetProductById', getProductById);
router.get('/GetProductByCategoryID', getProductByCategoryID);
router.get('/GetProductDetailByID', getProductDetailByID);
router.get('/GetProductRecommend', getProductRecommend);

export default router;
