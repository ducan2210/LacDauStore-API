import {Request, Response} from 'express';
import Product from '../models/product.model';
import {Op, Sequelize, where} from 'sequelize';
import Category from '../models/category.model';
import Supplier from '../models/supplier.model';
import Review from '../models/review.model';
import User from '../models/user.model';
import Promotion from '../models/promotion.model';
import ProductPromotion from '../models/productPromotion.model';
export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findAll();
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({message: 'Product not found'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching product'});
  }
};

export const getAllProductAvailability = async (
  req: Request,
  res: Response,
) => {
  try {
    const products = await Product.findAll({
      where: {
        stock: {
          [Op.gt]: 0, // Chỉ lấy các sản phẩm có stock > 0
        },
      },
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({message: 'No products available'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching products'});
  }
};

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.query.product_id,
      },
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({message: 'No product available'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching product'});
  }
};

export const searchProduct = async (
  req: Request,
  res: Response,
): Promise<Product | null | any> => {
  const {query} = req.query;
  if (!query || typeof query !== 'string') {
    return res
      .status(400)
      .json({error: 'Query is required and must be a string'});
  }
  try {
    // Tìm kiếm các category phù hợp với query
    const categories = await Category.findAll({
      where: {
        category_id: {[Op.like]: `%${query}%`}, // Tìm kiếm theo loại
      },
    });
    // Lấy danh sách category_id từ các category tìm được
    const categoryIds = categories.map((category: any) => category.category_id);

    // Tìm kiếm các sản phẩm theo tên hoặc category_id
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          {name: {[Op.like]: `%${query}%`}}, // Tìm kiếm theo tên
          {category_id: {[Op.in]: categoryIds}}, // Tìm kiếm theo category_id
          {description: {[Op.like]: `%${query}%`}}, // Tìm kiếm theo mô tả
        ],
      },
    });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({error: 'Error searching products'});
  }
};

export const getProductByCategoryID = async (req: Request, res: Response) => {
  try {
    const categoryId = req.query.category_id;

    // Hàm đệ quy để lấy tất cả danh mục con
    const getAllChildCategories = async (
      parentId: number,
    ): Promise<number[]> => {
      const children = await Category.findAll({where: {parent_id: parentId}});
      let childIds = children.map(child => child.category_id);
      for (let child of children) {
        const grandChildren = await getAllChildCategories(child.category_id);
        childIds = [...childIds, ...grandChildren];
      }
      return childIds;
    };

    // Lấy tất cả danh mục con và danh mục hiện tại
    const childCategories = await getAllChildCategories(Number(categoryId));
    const allCategoryIds = [Number(categoryId), ...childCategories];

    // Tìm tất cả sản phẩm thuộc các danh mục này
    const products = await Product.findAll({
      where: {
        category_id: {
          [Op.in]: allCategoryIds,
        },
      },
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({
        message: 'No products available in this category or its subcategories',
      });
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching products'});
  }
};

export const getProductDetailByID = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.query.product_id,
      },
      include: [
        {
          model: Supplier,
        },

        {
          model: Review,
          include: [
            {
              model: User,
            },
          ],
        },
      ],
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({message: 'No product available'});
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching product'});
  }
};

export const getProductRecommend = async (req: Request, res: Response) => {
  try {
    const product_id = Number(req.query.product_id);
    const category_id = req.query.category_id
      ? Number(req.query.category_id)
      : null;
    const name = req.query.name as string | undefined;
    const supplier_id = req.query.supplier_id
      ? Number(req.query.supplier_id)
      : null;

    const relatedProducts = await Product.findAll({
      where: {
        product_id: {[Op.ne]: product_id},
        [Op.or]: [
          {discount_price: {[Op.ne]: null}},
          name ? {name: {[Op.like]: `%${name}%`}} : {},
          category_id ? {category_id} : {},
          supplier_id ? {supplier_id} : {},
        ],
      },
      order: [[Sequelize.literal('discount_price IS NOT NULL'), 'DESC']],
    });

    res.status(200).json(relatedProducts);
  } catch (error) {
    res.status(500).json({error: 'Error fetching related products'});
  }
};
