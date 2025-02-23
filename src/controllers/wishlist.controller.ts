import { Request, Response } from 'express';
import Wishlist from '../models/wishlist.model';


export const getWishListById = async (req: Request, res: Response) => {
  const { user_id } = req.query;
  try {
    const result = await Wishlist.findAll({
      where: { user_id: user_id },
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({ message: 'No wishlist found for the specified user.' });
    }
  } catch (error) {
    console.error('Error while fetching the wishlist:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the wishlist. Please try again later.' });
  }
};


export const addToWishList = async (req: Request, res: Response): Promise<void> => {
  const { user_id, product_id } = req.body;
  try {
      // Kiểm tra xem sản phẩm đã có trong wishlist chưa
      console.log(user_id, product_id);
    const existingItem = await Wishlist.findOne({
      where: { user_id: user_id, product_id: product_id },
    });

    if (existingItem) {
      res.status(200).json({ message: 'Product already in wishlist.' });
    }
      else{
            // Thêm sản phẩm vào wishlist
            const newItem = await Wishlist.create({
            user_id: user_id,
            product_id: product_id,
            });

            res.status(201).json({
            message: 'Add to wish list successfully',
            wishList: newItem,
            });
        }
  } catch (error) {
    console.error('Error while adding to the wishlist:', error);
    res.status(500).json({ error: 'An error occurred while adding to the wishlist. Please try again later.' });
  }
};


export const deleteItemInWishList = async (req: Request, res: Response) => {
  const { user_id, product_id } = req.query;
  console.log(user_id, product_id); // Check the data sent in the request
  try {
    const result = await Wishlist.findOne({
      where: { user_id: user_id, product_id: product_id },
    });

    if (result) {
      await result.destroy();
      res.status(200).json({ message: 'Item deleted successfully from the wish list.' });
    } else {
      res.status(404).json({ message: 'No product found for the specified user.' });
    }
  } catch (error) {
    console.error('Error while fetching the wish list:', error);
    res.status(500).json({ error: 'An error occurred while retrieving the wish list. Please try again later.' });
  }
};
