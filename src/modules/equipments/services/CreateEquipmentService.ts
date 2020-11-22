import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';

import Equipment from '../infra/typeorm/entities/Equipment';
import IEquipmentsRepository from '../repositories/IEquipmentsRepository';

interface IRequest {
  name: string;
}

@injectable()
class CreateEquipmentService {
  constructor(
    @inject('EquipmentsRepository')
    private equipmentsRepository: IEquipmentsRepository,
  ) {}

  public async execute({ name }: IRequest): Promise<Equipment> {
    const findEquipment = await this.equipmentsRepository.findByName(name);

    if (findEquipment) {
      throw new AppError('Equipment already registered!');
    }

    const equipment = await this.equipmentsRepository.create(name);
    return equipment;
  }
}

export default CreateEquipmentService;
