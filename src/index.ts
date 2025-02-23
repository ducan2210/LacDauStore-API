import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from './routes/user.route';
import sequelize from './config/database';
import productRouter from './routes/product.route';
import categoryRouter from './routes/category.route';
import cartRouter from './routes/cart.route';
import wishListRouter from './routes/wishList.router';
import promotionRouter from './routes/promotion.route';
import paymentRoutes from './routes/payment.route';
import addressRoutes from './routes/address.route';
import order from './routes/order.route';
import orderItem from './routes/orderItem.route';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', userRoutes);
app.use('/api', productRouter);
app.use('/api', categoryRouter);
app.use('/api', cartRouter);
app.use('/api', wishListRouter);
app.use('/api', promotionRouter);
app.use('/api', paymentRoutes);
app.use('/api', addressRoutes);
app.use('/api', order);
app.use('/api', orderItem);
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connected!');
  })
  .catch(err => {
    console.error('Database connection failed:', err);
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
