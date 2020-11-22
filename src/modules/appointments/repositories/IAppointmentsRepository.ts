import Appointment from '../infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '../dtos/ICreateAppointmentDTO';
import IFindAllInDayDTO from '../dtos/IFindAllInDayDTO';
import IFindAppointmentByDateAndUserDTO from '../dtos/IFindAppointmentByDateAndUserDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment | undefined>;
  FindAppointmentByDateAndUser(
    data: IFindAppointmentByDateAndUserDTO,
  ): Promise<Appointment[] | undefined>;
  findAllInDay(data: IFindAllInDayDTO): Promise<Appointment[]>;
}
