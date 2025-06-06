import { DataSource } from 'typeorm';
import { Hash } from '../common/hash';
import { User } from '../modules/users/entities/user.entity';

export class SeedSuperAdmin {
  public static async up(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    const hashedPassword = await Hash.make('admin123');

    await queryRunner.manager.insert(User, {
      firstName: 'Super',
      lastName: 'Admin',
      email: 'admin@example.com',
      password: hashedPassword,
      dateOfBirth: new Date('1990-01-01'),
      dateOfJoining: new Date('2020-01-01'),
      settings: { theme: 'dark' },
      notes: 'Initial super admin user',
      isActive: true,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await queryRunner.release();
  }

  public static async down(dataSource: DataSource): Promise<void> {
    const queryRunner = dataSource.createQueryRunner();
    await queryRunner.connect();

    await queryRunner.manager.delete(User, { email: 'admin@example.com' });

    await queryRunner.release();
  }
}
