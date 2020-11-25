import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import Equipment from '@modules/equipments/infra/typeorm/entities/Equipment';

@Entity('appointments_equipments')
class AppointmentsEquipments {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => Appointment,
    appointment => appointment.appointment_equipments,
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment: Appointment;

  @ManyToOne(() => Equipment, equipment => equipment.appointment_equipments, {
    eager: true,
  })
  @JoinColumn({ name: 'equipment_id' })
  equipment: Equipment;

  @Column()
  equipment_id: string;

  @Column()
  appointment_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default AppointmentsEquipments;
