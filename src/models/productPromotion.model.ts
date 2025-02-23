import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

class ProductPromotion extends Model {
  public product_id!: number;
  public promotion_id!: number;
}

ProductPromotion.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  // Thiết lập product_id là một phần của khóa chính
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,  // Thiết lập promotion_id là một phần của khóa chính
    },
  },
  {
    sequelize,
    tableName: 'product_promotions',
    timestamps: false,
  }
);

export default ProductPromotion;
