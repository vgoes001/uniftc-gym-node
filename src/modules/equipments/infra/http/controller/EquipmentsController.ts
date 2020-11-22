import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateEquipmentService from '@modules/equipments/services/CreateEquipmentService';

export default class ProductsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name } = request.body;
    const createEquipment = container.resolve(CreateEquipmentService);

    const equipment = await createEquipment.execute({
      name,
    });

    return response.json(equipment);
  }
}
