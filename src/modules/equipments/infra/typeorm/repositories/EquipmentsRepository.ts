import { getRepository, Repository, In } from 'typeorm';

import IEquipmentsRepository from '@modules/equipments/repositories/IEquipmentsRepository';
import Equipment from '../entities/Equipment';

interface IFindEquipments {
  id: string;
}

class EquipmentsRepository implements IEquipmentsRepository {
  private ormRepository: Repository<Equipment>;

  constructor() {
    this.ormRepository = getRepository(Equipment);
  }

  public async create(name: string): Promise<Equipment> {
    const equipment = this.ormRepository.create({ name });

    await this.ormRepository.save(equipment);

    return equipment;
  }

  public async findByName(name: string): Promise<Equipment | undefined> {
    const findEquipment = await this.ormRepository.findOne({
      where: {
        name,
      },
    });

    return findEquipment;
  }

  public async findAllById(
    equipments: IFindEquipments[],
  ): Promise<Equipment[]> {
    const equipmentsToFind = await this.ormRepository.findByIds(equipments);
    return equipmentsToFind;
  }
}

export default EquipmentsRepository;
