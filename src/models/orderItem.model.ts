import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import Order from './order.model';
import Product from './product.model';

class OrderItem extends Model {
  public order_item_id!: number;
  public order_id!: number;
  public product_id!: number;
  public quantity!: number;
  public price!: number;
  public discount!: number;
}

OrderItem.init(
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
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
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount: {
      type: DataTypes.DECIMAL(5, 2),
      defaultValue: 0,
    },
  },
  {
    sequelize,
    tableName: 'order_items',
    timestamps: false,
  },
);

OrderItem.belongsTo(Order, {foreignKey: 'order_id'});
Order.hasMany(OrderItem, {foreignKey: 'order_id'});

OrderItem.belongsTo(Product, {foreignKey: 'product_id'});
Product.hasMany(OrderItem, {foreignKey: 'product_id'});

export default OrderItem;
