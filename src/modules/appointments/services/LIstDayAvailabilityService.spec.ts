/* eslint-disable no-await-in-loop */
import AppError from '@shared/errors/AppError';
import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentsRepository';
import ListDayAvailabilityService from './ListDayAvailabilityService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listDayAvailabilityService: ListDayAvailabilityService;

describe('ListDayAvailabilityService', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listDayAvailabilityService = new ListDayAvailabilityService(
      fakeAppointmentsRepository,
    );
  });
  it('Deve ser capaz de listar a disponibilidade de horários de um determinado dia', async () => {
    const appointments = new Array(30).fill(null).map(() => ({
      user_id: String(Math.ceil(Math.random() * 10000)),
      date: new Date(2020, 11, 20, 8),
    }));

    for (let index = 0; index < appointments.length; index += 1) {
      await fakeAppointmentsRepository.create(appointments[index]);
    }

    await fakeAppointmentsRepository.create({
      user_id: '12345678',
      date: new Date(2020, 11, 21, 8, 0, 0),
    });

    await fakeAppointmentsRepository.create({
      user_id: '12345677',
      date: new Date(2020, 11, 21, 8, 0, 0),
    });

    const availability = await listDayAvailabilityService.execute({
      year: 2020,
      month: 12,
      day: 20,
    });

    expect(availability).toEqual(
      expect.arrayContaining([
        { hour: 8, status: 'cheio', available: false },
        { hour: 9, status: 'vazio', available: true },
      ]),
    );
  });
});
