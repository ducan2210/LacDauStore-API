import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import Product from './product.model';
import Order from './order.model';

class Review extends Model {
  public review_id!: number;
  public user_id!: number;
  public product_id!: number;
  public rating!: number;
  public comment!: string | null;
  public created_at!: Date;
  public updated_at!: Date;
  public photos!: string | null;
  public order_id!: number;
}

Review.init(
  {
    review_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    rating: {
      type: DataTypes.TINYINT,
      allowNull: false,
      validate: {
        min: 1,
        max: 5,
      },
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    photos: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'reviews',
    timestamps: false,
  },
);

Review.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Review, {foreignKey: 'user_id'});

Review.belongsTo(Product, {foreignKey: 'product_id'});
Product.hasMany(Review, {foreignKey: 'product_id'});

Review.belongsTo(Order, {foreignKey: 'order_id'});
Order.hasMany(Review, {foreignKey: 'order_id'});
export default Review;
