import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Promotion extends Model {
  public promotion_id!: number;
  public code!: string;
  public discount_percent!: number;
  public start_date!: Date;
  public end_date!: Date;
  public min_order_value!: number | null;
  public status!: 'active' | 'expired';
}

Promotion.init(
  {
    promotion_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    code: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
    },
    discount_percent: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    min_order_value: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'expired'),
      defaultValue: 'active',
    },
  },
  {
    sequelize,
    tableName: 'promotions',
    timestamps: false,
  }
);

export default Promotion;
