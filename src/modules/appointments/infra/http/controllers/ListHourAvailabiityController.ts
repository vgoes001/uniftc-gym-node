import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListHourAvailabilityService from '@modules/appointments/services/ListHourAvailabilityService';

export default class ListHourAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { day, month, year } = request.body;

    const listHourAvailability = container.resolve(ListHourAvailabilityService);

    const hourAvailability = await listHourAvailability.execute({
      day,
      month,
      year,
    });

    return response.json(hourAvailability);
  }
}
