import {Request, Response} from 'express';
import Order from '../models/order.model';
import OrderItem from '../models/orderItem.model';
import Product from '../models/product.model';
import PaymentMethod from '../models/paymentMethod.model';
import Review from '../models/review.model';

export const createOrder = async (req: Request, res: Response) => {
  const {
    user_id,
    total_amount,
    order_information,
    discount_applied,
    payment_method_id,
  } = req.body;
  try {
    const order = await Order.create({
      user_id: user_id,
      total_amount: total_amount,
      order_information: order_information,
      discount_applied: discount_applied,
      payment_method_id: payment_method_id,
    });

    res.status(201).json({
      message: 'order registered successfully',
      order: order,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: 'Error creating order'});
  }
};

export const getOrderByUserId = async (req: Request, res: Response) => {
  try {
    const result = await Order.findAll({
      where: {user_id: req.query.user_id},
    });
    if (result) {
      res.status(200).json(result);
    } else {
      res.status(404).json({message: 'No order found for the specified user.'});
    }
  } catch (error) {
    console.error('Error while fetching the order:', error);
    res.status(500).json({
      error:
        'An error occurred while retrieving the order. Please try again later.',
    });
  }
};

export const getOrderById = async (req: Request, res: Response) => {
  try {
    const {order_id} = req.query;

    // Tìm đơn hàng và liên kết với các thông tin cần thiết
    const order = await Order.findOne({
      where: {order_id},
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product, // Lấy thông tin sản phẩm từ OrderItem
              attributes: ['product_id', 'name', 'price', 'image_url'],
            },
          ],
        },
        {
          model: PaymentMethod, // Lấy thông tin phương thức thanh toán
          attributes: ['payment_method_id', 'method_name'],
        },
        {
          model: Review,
        },
      ],
    });

    if (order) {
      res.status(200).json({order});
    }
  } catch (error) {
    res.status(500).json({
      error:
        'An error occurred while fetching the order. Please try again later.',
    });
  }
};
