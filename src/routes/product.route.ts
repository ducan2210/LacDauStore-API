import express from 'express';
import { getAllProduct, getAllProductAvailability, getProductByCategoryID, getProductById, searchProduct } from '../controllers/product.controller';


const router = express.Router()

router.get('/GetAllProduct', getAllProduct)
router.get('/GetSearchProduct', searchProduct)
router.get('/GetAllProductAvailability', getAllProductAvailability)
router.get('/GetProductById', getProductById)
router.get('/GetProductByCategoryID', getProductByCategoryID)
// router.get('/GetProductShortByTimeEndingSoonest', getProductShortByTimeEndingSoonest)
// router.get('/GetProductShortByPriceLowestFirst', getProductShortByPriceLowestFirst)
// router.get('/GetProductShortByPriceHighestFirst', getProductShortByPriceHighestFirst)
// router.get('/GetProductShortByTimeEndingSoonest', getProductShortByTimeNewlyListed)
export default router;

