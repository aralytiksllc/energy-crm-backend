import { QueryInterface } from 'sequelize';
import { Hash } from '../common/hash';

export async function up(queryInterface: QueryInterface): Promise<void> {
  const hashedPassword = await Hash.make('admin123');

  await queryInterface.bulkInsert('users', [
    {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      dateOfBirth: new Date('1990-01-01'),
      dateOfJoining: new Date('2020-01-01'),
      settings: JSON.stringify({ theme: 'dark' }),
      notes: 'Initial super admin user',
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
