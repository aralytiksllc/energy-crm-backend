import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.createTable('vendors', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactEmail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    contactPhone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    settings: {
      type: DataTypes.JSON,
      allowNull: true,
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
  await queryInterface.dropTable('vendors');
}
