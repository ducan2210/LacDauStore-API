import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Supplier extends Model {
  public supplier_id!: number;
  public name!: string;
  public contact_info!: string;
  public address!: string;
  public created_at!: Date;
}

Supplier.init(
  {
    supplier_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    contact_info: {
      type: DataTypes.TEXT,
    },
    address: {
      type: DataTypes.TEXT,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'suppliers',
    timestamps: false,
  }
);

export default Supplier;
