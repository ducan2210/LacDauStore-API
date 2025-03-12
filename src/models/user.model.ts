import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';

class User extends Model {
  public user_id!: number;
  public username!: string;
  public password!: string;
  public email!: string;
  public phone!: string;
  public role!: 'customer' | 'admin' | 'staff';
  public status!: 'active' | 'inactive' | 'banned';
  public created_at!: Date;
  public updated_at!: Date;
  public avatar!: string;
}

User.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone: {
      type: DataTypes.STRING(20),
    },
    role: {
      type: DataTypes.ENUM('customer', 'admin', 'staff'),
      defaultValue: 'customer',
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'banned'),
      defaultValue: 'active',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    avatar: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',
    timestamps: false,
  },
);

export default User;
