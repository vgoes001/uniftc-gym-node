import AppError from '@shared/errors/AppError';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfileService = new UpdateProfileService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });
  it('Deve ser capaz de atualizar seu perfil', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      enrollment: '123456789',
      course: 'Sistemas de Informação',
      password: '123456',
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      course: 'Engenharia de Software',
    });

    expect(updatedUser.name).toBe('John Doe');
    expect(updatedUser.course).toBe('Engenharia de Software');
  });

  it('Deve ser capaz de atualizar sua senha', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      enrollment: '123456789',
      course: 'Sistemas de Informação',
      password: '123456',
    });
    const updatedUser = await updateProfileService.execute({
      user_id: user.id,
      name: 'John Doe',
      course: 'Engenharia de Software',
      old_password: '123456',
      password: '123123',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('Não deve ser capaz de atualizar sua senha sem informar a senha antiga', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      enrollment: '123456789',
      course: 'Sistemas de Informação',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        course: 'Engenharia de Software',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar sua senha informando uma senha errada', async () => {
    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      enrollment: '123456789',
      course: 'Sistemas de Informação',
      password: '123456',
    });

    await expect(
      updateProfileService.execute({
        user_id: user.id,
        name: 'John Doe',
        course: 'Engenharia de Software',
        old_password: '12345679',

        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de atualizar o perfil de um usuário não existente', async () => {
    expect(
      updateProfileService.execute({
        user_id: 'non-existing-user-id',
        name: 'Joao',
        course: 'Engenharia',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
