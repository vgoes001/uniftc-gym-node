import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import CreateAppointmentService from './CreateAppointmentService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let createAppointment: CreateAppointmentService;

describe('CriarAgendamento', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    createAppointment = new CreateAppointmentService(
      fakeAppointmentsRepository,
    );
  });
  it('Deve ser capaz de criar um novo agendamento', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    const appointment = await createAppointment.execute({
      date: new Date(2020, 12, 10, 15),
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar dois agendamentos para o mesmo dia pelo mesmo usuário', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 10, 10, 8).getTime();
    });
    await createAppointment.execute({
      date: new Date(2020, 10, 10, 11),
      user_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 10, 10, 11),
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar um agendamento em uma data passada', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 12, 10, 12).getTime();
    });

    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 10, 11),
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('Não deve ser capaz de criar um agendamento antes das 08h e depois das 16h', async () => {
    await expect(
      createAppointment.execute({
        date: new Date(2020, 12, 10, 20),
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
