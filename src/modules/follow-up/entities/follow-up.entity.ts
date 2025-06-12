import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from 'src/modules/users/entity/user.entity';
import { Client } from 'src/modules/client/entities/client.entity';

@Entity()
export class FollowUp {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column({ nullable: true })
  note?: string;

  @Column()
  followUpDate: Date;

  @ManyToOne(() => User, (user) => user.followUps, { onDelete: 'CASCADE' })
  user: User;

  @ManyToOne(() => Client, (client) => client.followUps, {
    onDelete: 'CASCADE',
  })
  client: Client;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
