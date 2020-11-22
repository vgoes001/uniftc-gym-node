/* eslint-disable no-nested-ternary */
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { getHours, isAfter } from 'date-fns';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  day: number;
  month: number;
  year: number;
}

@injectable()
class ListAppointmentsAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ day, month, year }: IRequest): Promise<Appointment[]> {
    const appointments = await this.appointmentsRepository.findAllInDay({
      day,
      month,
      year,
    });

    return appointments;
  }
}

export default ListAppointmentsAvailabilityService;
