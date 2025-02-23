import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductView extends Model {
  public view_id!: number;
  public user_id!: number | null;
  public product_id!: number;
  public viewed_at!: Date;
}

ProductView.init(
  {
    view_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    viewed_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'product_views',
    timestamps: false,
  }
);

export default ProductView;
