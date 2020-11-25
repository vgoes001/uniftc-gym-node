import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import User from '@modules/users/infra/typeorm/entities/User';
import AppointmentsEquipments from '@modules/appointments/infra/typeorm/entities/AppointmentsEquipments';

@Entity('appointments')
class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('timestamp with time zone')
  date: Date;

  @Column()
  user_id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(
    () => AppointmentsEquipments,
    appointmentsEquipments => appointmentsEquipments.appointment,
    {
      cascade: true,
    },
  )
  @JoinColumn({ name: 'appointment_id' })
  appointment_equipments: AppointmentsEquipments[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Appointment;
