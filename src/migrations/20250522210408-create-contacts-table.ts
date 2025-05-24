import { QueryInterface, ModelAttributes, DataTypes } from 'sequelize';
import { Contact } from '../models/contact.model';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const attributes: ModelAttributes<Contact> = {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isPrimary: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    contactableType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contactableId: {
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

  await queryInterface.createTable('contacts', attributes);

  await queryInterface.addIndex(
    'contacts',
    ['contactableType', 'contactableId'],
    {
      name: 'contacts_contactable_index',
    },
  );
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.dropTable('contacts');
}
