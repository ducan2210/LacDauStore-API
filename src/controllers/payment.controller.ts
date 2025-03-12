import {Request, Response} from 'express';
import Stripe from 'stripe';

const stripe = new Stripe(
  'sk_test_51QpvILKa0s3UXoTKK1xG3vOJnF62iTCBPottyoNxuntNNQkgtzlWbOS3p8JxU6EVpPhrBJHknEaFiPRteTJPBu5M00rqDkIseh',
);

export const createPaymentUrl = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Kiểm tra và chuyển đổi amount thành số
    const amount = req.body.amount;
    const amountNumber =
      typeof amount === 'string'
        ? parseFloat(amount)
        : typeof amount === 'number'
        ? amount
        : undefined;

    if (amountNumber === undefined || isNaN(amountNumber)) {
      res.status(400).json({error: 'Invalid amount'});
      return;
    }

    // Tạo PaymentIntent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountNumber, // Integer, usd -> pennies, eur -> cents
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Trả về client_secret
    res.json({clientSecret: paymentIntent.client_secret});
  } catch (e) {
    res.status(400).json({
      error: 'An error occurred while creating the PaymentIntent',
    });
  }
};
