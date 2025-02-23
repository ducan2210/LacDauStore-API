import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class Inventory extends Model {
  public inventory_id!: number;
  public product_id!: number;
  public quantity!: number;
  public location!: string | null;
  public updated_at!: Date;
}

Inventory.init(
  {
    inventory_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    location: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'inventory',
    timestamps: false,
  }
);

export default Inventory;
