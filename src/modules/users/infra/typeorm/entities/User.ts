import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  enrollment: string;

  @Column()
  name: string;

  @Column()
  course: string;

  @Column()
  password: string;

  @Column()
  avatar: string;

  @Column({ enum: ['male', 'female'] })
  genre: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default User;
