import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import Order from './order.model';

class PersonalNotification extends Model {
  public notification_id!: number;
  public user_id!: number;
  public order_id!: number | null;
  public title!: string;
  public message!: string;
  public type!: 'order';
  public status!: 'unread' | 'read';
  public created_at!: Date;
  public updated_at!: Date;
  public Order?: Order; // Thêm thuộc tính tùy chọn cho quan hệ
}

PersonalNotification.init(
  {
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {type: DataTypes.INTEGER, allowNull: false},
    order_id: {type: DataTypes.INTEGER, allowNull: true},
    title: {type: DataTypes.STRING(100), allowNull: false},
    message: {type: DataTypes.TEXT, allowNull: false},
    type: {type: DataTypes.ENUM('order'), defaultValue: 'order'},
    status: {type: DataTypes.ENUM('unread', 'read'), defaultValue: 'unread'},
    created_at: {type: DataTypes.DATE, defaultValue: DataTypes.NOW},
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'personal_notifications',
    timestamps: false,
  },
);

PersonalNotification.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(PersonalNotification, {foreignKey: 'user_id'});

PersonalNotification.belongsTo(Order, {foreignKey: 'order_id'});
Order.hasMany(PersonalNotification, {foreignKey: 'order_id'});

export default PersonalNotification;
