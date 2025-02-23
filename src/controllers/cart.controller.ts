import {Request, Response} from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';

export const addToCart = async (req: Request, res: Response) => {
  const {user_id, product_id, quantity} = req.body;
  try {
    // Kiểm tra xem sản phẩm đã tồn tại trong giỏ hàng của user hay chưa
    const existingCartItem = await Cart.findOne({
      where: {user_id, product_id},
    });

    if (existingCartItem) {
      // Nếu đã tồn tại, cập nhật số lượng
      existingCartItem.quantity += quantity; // Cộng thêm số lượng mới
      await existingCartItem.save();

      res.status(200).json({
        message: 'Cart updated successfully',
        cart: existingCartItem,
      });
    } else {
      // Nếu chưa tồn tại, tạo mới
      const newCartItem = await Cart.create({
        user_id,
        product_id,
        quantity,
      });

      res.status(201).json({
        message: 'Cart created successfully',
        cart: newCartItem,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error processing cart'});
  }
};

export const getCartById = async (req: Request, res: Response) => {
  const {user_id} = req.query;
  try {
    const result = await Cart.findAll({
      where: {user_id: user_id},
    });

    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'No cart found for the specified user.'});
    }
  } catch (error) {
    console.error('Error while fetching the cart:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the cart. Please try again later.',
    });
  }
};

export const deleteItemInCart = async (req: Request, res: Response) => {
  const {user_id, product_id} = req.query;
  try {
    const result = await Cart.findOne({
      where: {user_id: user_id, product_id: product_id},
    });

    if (result) {
      await result.destroy();
      res
        .status(200)
        .json({message: 'Item deleted successfully from the cart.'});
    } else {
      res.status(404).json({message: 'No cart found for the specified user.'});
    }
  } catch (error) {
    console.error('Error while fetching the cart:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the cart. Please try again later.',
    });
  }
};

export const updateItemInCart = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {user_id, cart_id, product_id, quantity, status} = req.query;
  try {
    const cartItem = await Cart.findOne({
      where: {user_id: user_id, cart_id: cart_id},
    });

    console.log(cartItem);

    if (cartItem) {
      cartItem.quantity = Number(quantity);
      cartItem.status = Number(status);
      await cartItem.save();
      res.status(200).json({
        message: 'Item updated successfully in the cart.',
        cart: cartItem,
      });
    } else {
      res.status(404).json({message: 'No cart found for the specified user.'});
    }
  } catch (error) {
    console.error('Error while updating the cart:', error);
    res.status(500).json({
      error:
        'An error occurred while updating the cart. Please try again later.',
    });
  }
};

export const getCalculateCartTotal = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {user_id} = req.query;
  try {
    // Lấy tất cả các sản phẩm trong giỏ hàng của người dùng
    const cartItems = await Cart.findAll({
      where: {user_id: user_id, status: 1},
      include: [
        {
          model: Product,
          as: 'Product',
          attributes: ['price', 'discount_price'],
        },
      ], // Kết hợp với bảng Product để lấy giá và giá khuyến mãi
    });

    if (!cartItems || cartItems.length === 0) {
      res.status(200).json({total: 0});
      return;
    }

    // Tính tổng giá tiền
    const total = cartItems.reduce((sum, cartItem) => {
      const product = cartItem.get('Product') as Product;
      if (!product) {
        throw new Error(
          `Product not found for cart item with product_id: ${cartItem.product_id}`,
        );
      }
      const price =
        product.discount_price !== null
          ? product.discount_price
          : product.price;
      return sum + cartItem.quantity * price;
    }, 0);

    // Định dạng tổng giá tiền với 2 chữ số sau dấu phẩy
    const formattedTotal = parseFloat(total.toFixed(2));

    res.status(200).json({total: formattedTotal});
  } catch (error) {
    console.error('Error while calculating cart total:', error);
    res.status(500).json({
      error:
        'An error occurred while calculating the cart total. Please try again later.',
    });
  }
};

export const deleteItemInCartAfterCheckOut = async (
  req: Request,
  res: Response,
) => {
  const {user_id, cart_id} = req.query;
  try {
    const result = await Cart.findOne({
      where: {user_id: user_id, cart_id: cart_id},
    });

    if (result) {
      await result.destroy();
      res
        .status(200)
        .json({message: 'Item deleted successfully from the cart.'});
    } else {
      res.status(404).json({message: 'No cart found for the specified user.'});
    }
  } catch (error) {
    console.error('Error while fetching the cart:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the cart. Please try again later.',
    });
  }
};
