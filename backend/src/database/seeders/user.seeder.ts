import { User } from '../../user/entities/user.entity';
import dataSource from '../../../ormconfig';

export async function seedUser() {
  try {
    await dataSource.initialize();
    console.log('Data Source has been initialized!');

    const userRepository = dataSource.getRepository(User);
    
    // Check if user already exists
    const existingUser = await userRepository.findOne({ where: { username: 'nayeem' } });
    
    if (existingUser) {
      console.log('User with username "nayeem" already exists');
      return;
    }

    // Create new user
    const user = new User();
    user.username = 'nayeem';
    user.password = 'NAYEEMkhan1';

    await userRepository.save(user);
    console.log('User "nayeem" has been successfully seeded!');
  } catch (error) {
    console.error('Error during user seeding:', error);
  } finally {
    if (dataSource.isInitialized) {
      await dataSource.destroy();
    }
  }
}

// Run the seeder if this file is executed directly
if (require.main === module) {
  seedUser().catch(console.error);
}
