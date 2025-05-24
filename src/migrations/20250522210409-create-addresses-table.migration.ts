import { QueryInterface, ModelAttributes, DataTypes } from 'sequelize';
import { Address } from '../models/address.model';
import { AddressType } from '../enums/address-type.enum';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const attributes: ModelAttributes<Address> = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    street: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    streetTwo: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postalCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressType: {
      type: DataTypes.ENUM(...Object.values(AddressType)),
      defaultValue: AddressType.BOTH,
      allowNull: false,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    addressableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    addressableId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  };

  await queryInterface.sequelize.query(`
    CREATE TYPE "enum_addresses_address_type" AS ENUM (${Object.values(
      AddressType,
    )
      .map((v) => `'${v}'`)
      .join(', ')});
  `);

  await queryInterface.createTable('addresses', attributes);

  await queryInterface.addIndex(
    'addresses',
    ['addressableType', 'addressableId'],
    {
      name: 'addresses_addressable_index',
    },
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('addresses');

  await queryInterface.sequelize.query(`
    DROP TYPE IF EXISTS "enum_addresses_address_type";
  `);
}
