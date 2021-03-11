import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  PrimaryGeneratedColumn,
  OneToOne,
  Generated,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import Company from '@modules/companies/infra/typeorm/entities/Company';
import User from '@modules/users/infra/typeorm/entities/User';

@Entity('financial')
class Financial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Generated('increment')
  entry_number: number;

  // ONE financial can have ONE company
  @OneToOne(() => Company, company => company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  company_id: string;

  // ONE financial can have ONE order
  @OneToOne(() => Order, order => order.id)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  order_id: string;

  @Column()
  entry_type: string;

  @Column('decimal')
  gross_value: number;

  @Column('decimal')
  net_value: number;

  @Column('timestamp with time zone')
  due_date: Date | null;

  @Column()
  nf_number: string;

  @Column()
  boleto_number: string;

  @Column('timestamp with time zone')
  replan_date: Date | null;

  @Column('timestamp with time zone')
  paid_date: Date | null;

  @Column('decimal')
  paid_value: number;

  @Column('decimal')
  fee_value: number;

  @Column('decimal')
  updated_value: number;

  @Column('timestamp with time zone')
  initial_competence: Date | null;

  @Column('timestamp with time zone')
  final_competence: Date | null;

  @Column()
  cost_center: string;

  @Column()
  category: string;

  @Column()
  bank_account: string;

  @Column()
  description: string;

  @Column()
  charge_description: string;

  @Column('timestamp with time zone')
  before_status_charge: Date | null;

  @Column('timestamp with time zone')
  at_day_status_charge: Date | null;

  @Column('timestamp with time zone')
  two_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  four_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  seven_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  twelve_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  twenty_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  thirty_days_status_charge: Date | null;

  @Column('timestamp with time zone')
  forty_five_days_status_charge: Date | null;

  // ONE financial can have ONE user
  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  user_id: string | null;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Financial;
