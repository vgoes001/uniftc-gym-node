import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';

import AppointmentsEquipments from '@modules/appointments/infra/typeorm/entities/AppointmentsEquipments';

@Entity('equipments')
class Equipment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(
    () => AppointmentsEquipments,
    appointment_equipment => appointment_equipment.equipment,
  )
  appointment_equipments: AppointmentsEquipments[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Equipment;
