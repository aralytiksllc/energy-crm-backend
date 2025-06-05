import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {

  await queryInterface.bulkInsert('users', [
    {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: 'admin123',
      dateOfBirth: null,
      dateOfJoining: null,
      settings: null,
      notes: null,
      isActive: true,
      createdById: null,
      updatedById: null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkDelete('users', {
    email: 'admin@example.com',
  });
}
