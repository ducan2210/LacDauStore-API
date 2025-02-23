import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';

class PaymentMethod extends Model {
  public payment_method_id!: number;
  public method_name!: string;
  public description!: string | null;
  public status!: 'active' | 'inactive';
  public created_at!: Date;
}

PaymentMethod.init(
  {
    payment_method_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    method_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive'),
      defaultValue: 'active',
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'payment_methods',
    timestamps: false,
  },
);

export default PaymentMethod;
