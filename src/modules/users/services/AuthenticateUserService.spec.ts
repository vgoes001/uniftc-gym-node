import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

describe('AuthenticateUser', () => {
  it('Deve ser capaz de se autenticar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    const user = await createUser.execute({
      course: 'Sistemas de Informação',
      password: '123456',
      enrollment: '123456789',
      name: 'Vitor Goes',
    });

    const response = await authenticateUser.execute({
      enrollment: '123456789',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });
});
