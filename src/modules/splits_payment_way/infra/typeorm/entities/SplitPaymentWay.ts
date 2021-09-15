import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
  OneToOne,
} from 'typeorm';

import Order from '@modules/orders/infra/typeorm/entities/Order';
import PaymentMethod from '@modules/payment_methods/infra/typeorm/entities/PaymentMethod';

@Entity('splits_payment_way')
export default class SplitPaymentWay {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // MANY splits_payment_way can have ONE order
  @ManyToOne(() => Order, order => order.splits_payment_way)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @Column()
  order_id: string;

  @Column()
  payment_way: string;

  @Column('decimal')
  split_number: number;

  @Column('decimal')
  split_value: number;

  @Column('timestamp with time zone')
  split_due_date: Date | null;

  // ONE split_payment_way can have ONE payment_method
  @OneToOne(() => PaymentMethod, payment_method => payment_method.id, {
    eager: true,
  })
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @Column()
  payment_method_id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
