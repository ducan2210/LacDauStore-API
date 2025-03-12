import {Request, Response} from 'express';
import ProductPromotion from '../models/productPromotion.model';
import Promotion from '../models/promotion.model';

export const getPromotion = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {product_id} = req.query;

  try {
    const productPromotions = await ProductPromotion.findAll({
      where: {
        product_id: product_id,
      },
    });

    if (!productPromotions || productPromotions.length === 0) {
      res.status(200).json([]);
      return;
    }
    const activePromotions = await Promise.all(
      productPromotions.map(async productPromotion => {
        return await Promotion.findOne({
          where: {
            promotion_id: productPromotion.promotion_id,
            status: 'active',
          },
        });
      }),
    );
    const validPromotions = activePromotions.filter(
      promotion => promotion !== null,
    );
    if (validPromotions.length === 0) {
      res.status(200).json([]);
      return;
    }
    res.status(200).json(validPromotions[0]);
  } catch (error) {
    res.status(500).json({error: 'Error fetching promotion'});
  }
};

export const getPromotionByCodeActive = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const {code} = req.query;
  try {
    const promotion = await Promotion.findOne({
      where: {
        code: code,
        status: 'active',
      },
    });
    if (!promotion) {
      res.status(200).json(null);
      return;
    } else {
      const result = await ProductPromotion.findOne({
        where: {
          promotion_id: promotion.promotion_id,
        },
      });
      if (result) {
        res.status(200).json(null);
        return;
      }
      res.status(200).json(promotion);
    }
  } catch (error) {
    res.status(500).json({error: 'Error fetching promotion'});
  }
};
