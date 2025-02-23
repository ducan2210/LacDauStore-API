
import { Request, Response } from 'express';
import Category from '../models/category.model';

export const getCategory = async (req: Request, res: Response) => {
  console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
  try {
    const category = await Category.findAll({where:  { parent_id: null}})
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const getAllCategoryChildren= async (req: Request, res: Response) => {
  console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
  try {
    const category = await Category.findAll({
      where: { parent_id: req.query.parent_id },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching roduct' });
  }
};

export const getAllCategoryRoot= async (req: Request, res: Response) => {
  try {
    const category = await Category.findAll({
      where: { parent_id: null },
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching roduct' });
  }
};

export const getCategoryTree = async (req: Request, res: Response) => {
  try {
    // Lấy tất cả danh mục từ cơ sở dữ liệu
    const categories = await Category.findAll();

    // Tạo một hàm đệ quy để xây dựng cây danh mục
    const buildCategoryTree = (parentId: number | null): any[] => {
      return categories
        .filter(category => category.parent_id === parentId)
        .map(category => ({
          category_id: category.category_id,
          name: category.name,
          description: category.description,
          parent_id: category.parent_id,
          created_at: category.created_at,
          updated_at: category.updated_at,
          children: buildCategoryTree(category.category_id), // Đệ quy để lấy các danh mục con
        }));
    };

    // Xây dựng cây danh mục từ gốc (parent_id === null)
    const categoryTree = buildCategoryTree(null);

    // Trả về dữ liệu dạng cây
    res.status(200).json(categoryTree);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching category tree' });
  }
};

