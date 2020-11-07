import { getRepository, Repository, Raw, QueryBuilder } from 'typeorm';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import IFindAllInDayDTO from '@modules/appointments/dtos/IFindAllInDayDTO';
import IFindAppointmentByDateAndUserDTO from '@modules/appointments/dtos/IFindAppointmentByDateAndUserDTO';
import { getMonth, getYear, getDate } from 'date-fns';

export default class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async FindAppointmentByDateAndUser({
    date,
    user_id,
  }: IFindAppointmentByDateAndUserDTO): Promise<Appointment[] | undefined> {
    const parsedMonth = String(getMonth(date) + 1).padStart(2, '0');
    const parsedDay = String(getDate(date)).padStart(2, '0');
    const year = String(getYear(date));
    const finalDate = `${year}-${parsedMonth}-${parsedDay}`;

    const findAppointment = (await this.ormRepository.query(
      `SELECT DATE(date) FROM appointments 
      WHERE DATE(date)='${finalDate}'
      AND user_id = '${user_id}'
      `,
    )) as Appointment[];

    return findAppointment.length ? findAppointment : undefined;
  }

  public async create({
    user_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = this.ormRepository.create({ user_id, date });

    await this.ormRepository.save(appointment);

    return appointment;
  }

  public async findAllInDay({
    day,
    month,
    year,
  }: IFindAllInDayDTO): Promise<Appointment[]> {
    const parsedMonth = String(month).padStart(2, '0');
    const parsedDay = String(day).padStart(2, '0');

    const appointments = this.ormRepository.find({
      where: {
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'DD-MM-YYYY') = '${parsedDay}-${parsedMonth}-${year}'`,
        ),
      },
    });

    return appointments;
  }
}
