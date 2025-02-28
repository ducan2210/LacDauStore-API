import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';

class GlobalNotification extends Model {
  public notification_id!: number;
  public title!: string;
  public message!: string;
  public type!: 'promotion' | 'system';
  public created_at!: Date;
  public updated_at!: Date;
}

GlobalNotification.init(
  {
    notification_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM('promotion', 'system'),
      defaultValue: 'promotion',
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
    tableName: 'global_notifications',
    timestamps: false,
  },
);

export default GlobalNotification;
