
import { Request, Response } from 'express';
import Product from '../models/product.model';
import { Op, where } from 'sequelize';
import Category from '../models/category.model';

export const getAllProduct = async (req: Request, res: Response) => {
  console.log(req.query); // Kiểm tra xem req.query có chứa giá trị gì
  try {
    const product = await Product.findAll()
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const getAllProductAvailability = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      where: {
        stock: {
          [Op.gt]: 0 // Chỉ lấy các sản phẩm có stock > 0
        }
      }
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};



export const getProductById = async (req: Request, res: Response) => {
  console.log(req.query)
  try {
    const product = await Product.findOne({
      where: {
        product_id: req.query.product_id,
      }
    });

    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'No product available' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching product' });
  }
};

export const searchProduct = async (req: Request, res: Response): Promise<Product | null | any> => {
  const { query } = req.query; // Lấy chuỗi tìm kiếm từ query parameters
  console.log(query);
  // Kiểm tra query có phải là chuỗi hay không
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Query is required and must be a string' });
  }
  try {
    // Tìm kiếm các category phù hợp với query
    const categories = await Category.findAll({
      where: {
        category_id: { [Op.like]: `%${query}%` }, // Tìm kiếm theo loại
      },
    });
    // Lấy danh sách category_id từ các category tìm được
    const categoryIds = categories.map((category: any) => category.category_id);

    // Tìm kiếm các sản phẩm theo tên hoặc category_id
    const products = await Product.findAll({
      where: {
        [Op.or]: [
          { name: { [Op.like]: `%${query}%` } }, // Tìm kiếm theo tên
          { category_id: { [Op.in]: categoryIds } }, // Tìm kiếm theo category_id
          { description: { [Op.like]: `%${query}%` } }, // Tìm kiếm theo mô tả
        ],
      },
    });

    // // Kiểm tra nếu có sản phẩm, trả về kết quả
    // if (products.length > 0) {
    //   res.status(200).json(products);
    // } else {
    //   res.status(404).json(products);
    // }
     res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error searching products' });
  }
};

export const getProductByCategoryID = async (req: Request, res: Response) => {
  try {
    const categoryId = req.query.category_id;

    // Hàm đệ quy để lấy tất cả danh mục con
    const getAllChildCategories = async (parentId: number): Promise<number[]> => {
      const children = await Category.findAll({ where: { parent_id: parentId } });
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
          [Op.in]: allCategoryIds
        }
      }
    });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      res.status(404).json({ message: 'No products available in this category or its subcategories' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching products' });
  }
};

// export const getProductShortByTimeEndingSoonest = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['updated_at', 'DESC'] // Sắp xếp theo thời gian cập nhật giảm dần
//       ]
//     });

//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };

// export const getProductShortByTimeNewlyListed = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['updated_at', 'ASC'] // Sắp xếp theo thời gian cập nhật tăng dần
//       ]
//     });

//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };

// export const getProductShortByPriceLowestFirst = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['price', 'ASC'] // Sắp xếp theo giá tăng dần
//       ]
//     });

//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };

// export const getProductShortByPriceHighestFirst = async (req: Request, res: Response) => {
//   try {
//     const products = await Product.findAll({
//       order: [
//         ['price', 'DESC'] // Sắp xếp theo giá giảm dần
//       ]
//     });

//     if (products.length > 0) {
//       res.status(200).json(products);
//     } else {
//       res.status(404).json({ message: 'No products available' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Error fetching products' });
//   }
// };