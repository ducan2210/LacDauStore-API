import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import Product from './product.model';

class Wishlist extends Model {
  public wishlist_id!: number;
  public user_id!: number;
  public product_id!: number;
  public added_at!: Date;
}

Wishlist.init(
  {
    wishlist_id: {
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
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'wishlist',
    timestamps: false,
  },
);

Wishlist.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Wishlist, {foreignKey: 'user_id'});

Wishlist.belongsTo(Product, {foreignKey: 'product_id'});
Product.hasMany(Wishlist, {foreignKey: 'product_id'});

export default Wishlist;
