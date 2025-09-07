import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { TodoStatus } from '../types';
import { User } from '../../user/entities/user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({
    type: 'enum',
    enum: TodoStatus,
    default: TodoStatus.PENDING,
  })
  status: TodoStatus;

  @CreateDateColumn({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ type: 'uuid', nullable: false })
  userId: string;
}
