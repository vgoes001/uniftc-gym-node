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
    const appointment = await createAppointment.execute({
      date: new Date(),
      user_id: '123123',
    });

    expect(appointment).toHaveProperty('id');
  });

  it('Não deve ser capaz de criar dois agendamentos para o mesmo dia', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11);
    await createAppointment.execute({
      date: appointmentDate,
      user_id: '123123',
    });

    await expect(
      createAppointment.execute({
        date: appointmentDate,
        user_id: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
