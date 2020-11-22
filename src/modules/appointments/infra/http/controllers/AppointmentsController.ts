import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';

import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';
import ListAppointmentsService from '@modules/appointments/services/ListAppointmentsService';

export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;
    const { date, equipments } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = container.resolve(CreateAppointmentService);
    const appointment = await createAppointment.execute({
      date: parsedDate,
      user_id,
      equipments,
    });

    return response.json(appointment);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;

    const listAppointments = container.resolve(ListAppointmentsService);

    const appointments = await listAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(appointments);
  }
}
