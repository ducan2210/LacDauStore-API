import express from 'express';
import { getCategory, getAllCategoryChildren, getCategoryTree, getAllCategoryRoot } from '../controllers/category.controller';
const router = express.Router()
router.get('/GetCategory', getCategory)
router.get('/GetCategoryChildren', getAllCategoryChildren)
router.get('/GetCategoryTree', getCategoryTree)
router.get('/GetAllCategoryRoot', getAllCategoryRoot)

export default router;