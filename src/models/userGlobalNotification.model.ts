import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model';
import GlobalNotification from './globalNotification.model';

class UserGlobalNotification extends Model {
  public user_id!: number;
  public notification_id!: number;
  public status!: 'unread' | 'read';
  public read_at!: Date | null;
  public GlobalNotification?: GlobalNotification; 
}

UserGlobalNotification.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    notification_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM('unread', 'read'),
      defaultValue: 'unread',
    },
    read_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'user_global_notifications',
    timestamps: false,
  },
);

UserGlobalNotification.belongsTo(User, {foreignKey: 'user_id'});
User.hasMany(UserGlobalNotification, {foreignKey: 'user_id'});

UserGlobalNotification.belongsTo(GlobalNotification, {
  foreignKey: 'notification_id',
});
GlobalNotification.hasMany(UserGlobalNotification, {
  foreignKey: 'notification_id',
});

export default UserGlobalNotification;
