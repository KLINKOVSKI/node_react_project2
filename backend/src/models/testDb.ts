import { createUser, findUserByEmail } from './user.model';

const testDb = async () => {
  const newUser = await createUser({
    username: 'testuser',
    email: 'testuser@example.com',
    password: 'hashedpassword123',
  });
  console.log('New User:', newUser);

  const foundUser = await findUserByEmail('testuser@example.com');
  console.log('Found User:', foundUser);
};

testDb();
