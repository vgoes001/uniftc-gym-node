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
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IEquipmentsRepository from '@modules/equipments/repositories/IEquipmentsRepository';

interface IEquipment {
  id: string;
}

interface IRequest {
  date: Date;
  equipments: IEquipment[];
  user_id: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute({
    date,
    user_id,
    equipments,
  }: IRequest): Promise<Appointment> {
    const existentEquipments = await this.equipmentsRepository.findAllById(
      equipments,
    );

    if (!existentEquipments.length) {
      throw new AppError('Could not find any equipment with the given ids');
    }

    const existentEquipmentsIds = existentEquipments.map(
      equipment => equipment.id,
    );

    const checkInexistentEquipments = equipments.filter(
      product => !existentEquipmentsIds.includes(product.id),
    );

    if (!checkInexistentEquipments.length) {
      throw new AppError(
        `Could not find product ${checkInexistentEquipments[0].id}`,
      );
    }

    const serializedEquipments = equipments.map(equipment => {
      return {
        equipment_id: equipment,
      };
    });

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
      equipments: serializedEquipments,
    });

    if (!appointment) {
      throw new AppError('Não é possível econtrar o usuário informado');
    }

    return appointment;
  }
}

export default CreateAppointmentService;
