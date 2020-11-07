import {
  startOfHour,
  isBefore,
  getDate,
  getYear,
  getMonth,
  getHours,
} from 'date-fns';

import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  date: Date;
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {}

  public async execute({ date, user_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date);
    const day = getDate(appointmentDate);
    const year = getYear(appointmentDate);
    const month = getMonth(appointmentDate);

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 16) {
      throw new AppError(
        'Você não pode criar um agendamento antes das 08 e depois das 16',
      );
    }

    const checkDate = new Date(year, month, day);

    if (isBefore(appointmentDate, Date.now())) {
      throw new AppError(
        'Você não pode criar um agendamento em uma data passada',
      );
    }

    const findAppointmentInSameDate = await this.appointmentsRepository.FindAppointmentByDateAndUser(
      {
        date: checkDate,
        user_id,
      },
    );

    if (findAppointmentInSameDate) {
      throw new AppError(
        'Não é possível agendar mais de um agendamento por dia',
      );
    }
    const appointment = await this.appointmentsRepository.create({
      date: appointmentDate,
      user_id,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
