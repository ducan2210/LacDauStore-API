import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import Product from './product.model';
import Promotion from './promotion.model';

class ProductPromotion extends Model {
  public product_id!: number;
  public promotion_id!: number;
}

ProductPromotion.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Thiết lập product_id là một phần của khóa chính
    },
    promotion_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true, // Thiết lập promotion_id là một phần của khóa chính
    },
  },
  {
    sequelize,
    tableName: 'product_promotions',
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ['product_id', 'promotion_id'], // Khóa chính kết hợp
      },
    ],
  },
);

ProductPromotion.belongsTo(Product, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});
Product.hasMany(ProductPromotion, {
  foreignKey: 'product_id',
  onDelete: 'CASCADE',
});

ProductPromotion.belongsTo(Promotion, {
  foreignKey: 'promotion_id',
  onDelete: 'CASCADE',
});
Promotion.hasMany(ProductPromotion, {
  foreignKey: 'promotion_id',
  onDelete: 'CASCADE',
});

Product.belongsToMany(Promotion, {
  through: ProductPromotion,
  foreignKey: 'product_id',
});
Promotion.belongsToMany(Product, {
  through: ProductPromotion,
  foreignKey: 'promotion_id',
});

export default ProductPromotion;
