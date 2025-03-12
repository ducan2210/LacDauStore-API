import {Request, Response} from 'express';

import OrderItem from '../models/orderItem.model';

export const createOrderItem = async (req: Request, res: Response) => {
  const {order_id, product_id, quantity, price, discount} = req.body;

  try {
    const orderItem = await OrderItem.create({
      order_id: order_id,
      product_id: product_id,
      quantity: quantity,
      price: price,
      discount: discount,
    });

    res.status(201).json({
      message: 'orderItem registered successfully',
      orderItem: orderItem,
    });
  } catch (error) {
    res.status(500).json({error: 'Error creating orderItem'});
  }
};
