import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('sales', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    saleNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
      autoIncrement: true,
    },
    saleDate: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    customerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'customers',
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
  });
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('sales');
}
