import { QueryInterface, ModelAttributes, DataTypes } from 'sequelize';
import { Product } from '../models/product.model';
import { ProductUnit } from '../enums/product-unit.enum';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const attributes: ModelAttributes<Product> = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    unit: {
      type: DataTypes.ENUM(...Object.values(ProductUnit)),
      allowNull: false,
    },
    sku: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    length: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    width: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    height: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    upc: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    mpn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ean: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isbn: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    settings: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    vendorId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'vendors',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    updatedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
    },
  };

  await queryInterface.sequelize.query(`
    CREATE TYPE "enum_products_unit" AS ENUM (${Object.values(ProductUnit)
      .map((v) => `'${v}'`)
      .join(', ')});
  `);

  await queryInterface.createTable('products', attributes);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('products');

  await queryInterface.sequelize.query(`
    DROP TYPE IF EXISTS "enum_products_unit";
  `);
}
