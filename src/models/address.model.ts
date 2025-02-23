import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import User from './user.model'; // Import model User để tạo quan hệ

class Address extends Model {
  public address_id!: number;
  public user_id!: number;
  public full_name!: string;
  public phone!: string;
  public address_line!: string;
  public city!: string;
  public state!: string;
  public postal_code!: string;
  public country!: string;
  public is_default!: number;
  public created_at!: Date;
  public updated_at!: Date;
}

Address.init(
  {
    address_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: User, // Liên kết với bảng users
        key: 'user_id',
      },
      onDelete: 'CASCADE',
    },
    full_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    address_line: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(100),
    },
    state: {
      type: DataTypes.STRING(100),
    },
    postal_code: {
      type: DataTypes.STRING(20),
    },
    country: {
      type: DataTypes.STRING(100),
    },
    is_default: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    tableName: 'addresses',
    timestamps: false,
  },
);

// Tạo quan hệ với User (1 User có nhiều Address)
User.hasMany(Address, {foreignKey: 'user_id'});
Address.belongsTo(User, {foreignKey: 'user_id'});

export default Address;
