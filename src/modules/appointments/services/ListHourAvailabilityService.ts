/* eslint-disable no-nested-ternary */
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { getHours, isAfter } from 'date-fns';
import { uuid } from 'uuidv4';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  day: number;
  month: number;
  year: number;
}

type IResponse = Array<{
  hour: number;
  status: string;
  available: boolean;
  key: string;
}>;

@injectable()
class ListHourAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ day, month, year }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInDay({
      day,
      month,
      year,
    });

    const eachHourArray = Array.from(
      { length: 8 },
      (value, index) => index + 8,
    );
    const currentDate = new Date(Date.now());

    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.filter(
        appointment => getHours(appointment.date) === hour,
      );

      const compareDate = new Date(year, month - 1, day, hour);
      return {
        key: uuid(),
        hour,
        available:
          appointmentsInHour.length < 29 && isAfter(compareDate, currentDate),
        status:
          appointmentsInHour.length < 10
            ? 'vazio'
            : appointmentsInHour.length < 20
            ? 'moderado'
            : 'cheio',
      };
    });

    return availability;
  }
}

export default ListHourAvailabilityService;
