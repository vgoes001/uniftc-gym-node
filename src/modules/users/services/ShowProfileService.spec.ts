import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);
  });
  it('Deve ser capaz de mostrar o perfil', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Vitor Goes',
      enrollment: '123456789',
      course: 'Sistemas de Informação',
      password: '123456',
    });

    const profile = await showProfile.execute({
      user_id: user.id,
    });

    expect(profile.name).toBe('Vitor Goes');
  });

  it('Não deve ser capaz de mostrar o perfil de um usuário não existente', async () => {
    expect(
      showProfile.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
