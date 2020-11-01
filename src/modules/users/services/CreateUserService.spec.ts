import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('CriarUsuario', () => {
  it('Deve ser capaz de criar um novo usuario', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
    const user = await createUser.execute({
      name: 'Vitor Goes',
      course: 'Sistemas de Informacao',
      enrollment: '123456789',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar um novo usuario com o mesmo número de matricula de outro usuário', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );

    await createUser.execute({
      name: 'Vitor Goes',
      course: 'Sistemas de Informacao',
      enrollment: '123456789',
      password: '123123',
    });

    await expect(
      createUser.execute({
        name: 'Vitor Goes',
        course: 'Sistemas de Informacao',
        enrollment: '123456789',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
