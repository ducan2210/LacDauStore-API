import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class UserLog extends Model {
  public log_id!: number;
  public user_id!: number;
  public login_time!: Date;
  public logout_time!: Date | null;
  public ip_address!: string;
  public user_agent!: string;
}

UserLog.init(
  {
    log_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    login_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    logout_time: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    user_agent: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'user_logs',
    timestamps: false,
  }
);

export default UserLog;
