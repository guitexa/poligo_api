import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinColumn,
} from 'typeorm';

import Contact from '@modules/contacts/infra/typeorm/entities/Contact';

@Entity('clients')
export default class Client {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  cpf_cnpj: string;

  @Column()
  phone: string;

  @Column()
  contacts_id: string;

  // MANY contacts to MANY clients
  @ManyToMany(() => Contact)
  @JoinColumn({ name: 'contacts_id' })
  contacts: Contact[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
