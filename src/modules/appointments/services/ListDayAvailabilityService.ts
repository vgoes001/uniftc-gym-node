/* eslint-disable no-nested-ternary */
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import { getHours } from 'date-fns';
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
}>;

@injectable()
class ListDayAvailabilityService {
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

    const availability = eachHourArray.map(hour => {
      const appointmentsInHour = appointments.filter(
        appointment => getHours(appointment.date) === hour,
      );
      return {
        hour,
        available: appointmentsInHour.length < 29,
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

export default ListDayAvailabilityService;
