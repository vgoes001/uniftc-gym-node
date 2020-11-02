import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Deve ser capaz de se autenticar', async () => {
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

  it('Não deve ser capaz de se autenticar com um usuário inexistente', async () => {
    await expect(
      authenticateUser.execute({
        enrollment: '123456789',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de se autenticar com a senha incorreta', async () => {
    await createUser.execute({
      course: 'Sistemas de Informação',
      password: '123456',
      enrollment: '123456789',
      name: 'Vitor Goes',
    });

    await expect(
      authenticateUser.execute({
        enrollment: '123456789',
        password: '123789',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
