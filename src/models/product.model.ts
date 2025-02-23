import {DataTypes, Model} from 'sequelize';
import sequelize from '../config/database';
import Category from './category.model';
import Supplier from './supplier.model';

class Product extends Model {
  public product_id!: number;
  public category_id!: number;
  public supplier_id!: number | null;
  public name!: string;
  public description!: string;
  public price!: number;
  public discount_price!: number | null;
  public stock!: number;
  public image_url!: string;
  public created_at!: Date;
  public updated_at!: Date;
}

Product.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    supplier_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discount_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    image_url: {
      type: DataTypes.TEXT,
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
    tableName: 'products',
    timestamps: false,
  },
);

Product.belongsTo(Category, {foreignKey: 'category_id'});
Category.hasMany(Product, {foreignKey: 'category_id'});

Product.belongsTo(Supplier, {foreignKey: 'supplier_id'});
Supplier.hasMany(Product, {foreignKey: 'supplier_id'});

export default Product;
