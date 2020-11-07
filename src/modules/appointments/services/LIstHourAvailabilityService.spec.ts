/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListHourAvailabilityService from './ListHourAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listHourAvailabilityService: ListHourAvailabilityService;

describe('ListDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listHourAvailabilityService = new ListHourAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('Deve ser capaz de listar a disponibilidade de horários de um determinado dia', async () => {
    const appointments = new Array(30).fill(null).map(() => ({
      user_id: String(Math.ceil(Math.random() * 10000)),
      date: new Date(2020, 11, 20, 14),
    }));

    for (let index = 0; index < appointments.length; index += 1) {
      await fakeAppointmentsRepository.create(appointments[index]);
    }

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 20, 11).getTime();
    });

    await fakeAppointmentsRepository.create({
      user_id: '12345678',
      date: new Date(2020, 11, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '12345677',
      date: new Date(2020, 11, 21, 8, 0, 0),
    });

    const availability = await listHourAvailabilityService.execute({
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 14,
          status: 'cheio',
          available: false,
        },
        { hour: 8, status: 'vazio', available: false },
        { hour: 9, status: 'vazio', available: false },
        { hour: 10, status: 'vazio', available: false },
        { hour: 11, status: 'vazio', available: false },
        { hour: 12, status: 'vazio', available: true },
        { hour: 15, status: 'vazio', available: true },
      ]),
    );
  });
  it('Deve retornar o status moderado, quando a quantidade de agendamentos for maior que 10 e menor que 20', async () => {
    const appointments = new Array(15).fill(null).map(() => ({
      user_id: String(Math.ceil(Math.random() * 10000)),
      date: new Date(2020, 11, 20, 14),
    }));

    for (let index = 0; index < appointments.length; index += 1) {
      await fakeAppointmentsRepository.create(appointments[index]);
    }

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 11, 20, 11).getTime();
    });

    const availability = await listHourAvailabilityService.execute({
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        {
          hour: 14,
          status: 'moderado',
          available: true,
        },
        { hour: 8, status: 'vazio', available: false },
        { hour: 9, status: 'vazio', available: false },
        { hour: 10, status: 'vazio', available: false },
        { hour: 11, status: 'vazio', available: false },
        { hour: 12, status: 'vazio', available: true },
        { hour: 15, status: 'vazio', available: true },
      ]),
    );
  });
});
