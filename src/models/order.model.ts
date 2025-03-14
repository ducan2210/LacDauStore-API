import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import PaymentMethod from './paymentMethod.model';
class Order extends Model {
  public order_id!: number;
  public user_id!: number;
  public total_amount!: number;
  public status!: 'pending' | 'shipped' | 'completed' | 'cancelled';
  public payment_method_id!: number | null;
  public created_at!: Date;
  public updated_at!: Date;
  public order_information!: string;
  public discount_applied!: string;
}

Order.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    total_amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('pending', 'shipped', 'completed', 'cancelled'),
      defaultValue: 'pending',
    },
    discount_applied: {
      type: DataTypes.TEXT,
    },
    order_information: {
      type: DataTypes.TEXT,
    },
    payment_method_id: {
      type: DataTypes.INTEGER,
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
  },
  {
    sequelize,
    tableName: 'orders',
    timestamps: false,
  },
);

Order.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(Order, {foreignKey: 'user_id'});

Order.belongsTo(PaymentMethod, {
  foreignKey: 'payment_method_id',
});
PaymentMethod.hasMany(Order, { foreignKey: 'payment_method_id' });



export default Order;
