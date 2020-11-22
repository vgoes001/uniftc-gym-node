import Equipment from '../infra/typeorm/entities/Equipment';

interface IFindEquipments {
  id: string;
}

export default interface IProductsRepository {
  create(name: string): Promise<Equipment>;
  findByName(name: string): Promise<Equipment | undefined>;
  findAllById(equipments: IFindEquipments[]): Promise<Equipment[]>;
}
