import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import Product from './product.model';
import User from './user.model';

class Cart extends Model {
  public cart_id!: number;
  public user_id!: number;
  public product_id!: number;
  public quantity!: number;
  public added_at!: Date;
  public status!: number;
}

Cart.init(
  {
    cart_id: {
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
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'cart',
    timestamps: false,
  },
);
// Thiết lập mối quan hệ
Cart.belongsTo(Product, {foreignKey: 'product_id'});
Cart.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Cart, {foreignKey: 'user_id'});

Product.hasMany(Cart, {foreignKey: 'product_id'});

export default Cart;
