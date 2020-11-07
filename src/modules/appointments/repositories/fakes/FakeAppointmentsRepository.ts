import { uuid } from 'uuidv4';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';
import IFindAppointmentByDateAndUserDTO from '../../dtos/IFindAppointmentByDateAndUserDTO';

export default class FakeAppointmentsRepository
  implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async FindAppointmentByDateAndUser({
    date,
    user_id,
  }: IFindAppointmentByDateAndUserDTO): Promise<Appointment[] | undefined> {
    const appointmentsFound: Appointment[] = [];
    const findAppointment = this.appointments.find(
      appointment =>
        isEqual(
          new Date(
            getYear(appointment.date),
            getMonth(appointment.date),
            getDate(appointment.date),
          ),
          date,
        ) && appointment.user_id === user_id,
    );

    if (findAppointment) {
      appointmentsFound.push(findAppointment);
    }

    return appointmentsFound.length ? appointmentsFound : undefined;
  }

  public async create({
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, user_id });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findAllInDay({
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const findAppointment = this.appointments.filter(
      appointment =>
        getMonth(appointment.date) + 1 === month &&
        getYear(appointment.date) === year &&
        getDate(appointment.date) === day,
    );

    return findAppointment;
  }
}
