import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHourAvailabilityService from '@modules/appointments/services/ListHourAvailabilityService';

export default class ListHourAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.query;

    const listHourAvailability = container.resolve(ListHourAvailabilityService);

    const hourAvailability = await listHourAvailability.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(hourAvailability);
  }
}
