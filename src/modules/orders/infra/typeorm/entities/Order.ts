import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  Generated,
  OneToMany,
  OneToOne,
} from 'typeorm';

import Company from '@modules/companies/infra/typeorm/entities/Company';
import User from '@modules/users/infra/typeorm/entities/User';
import OrderProduct from '@modules/orders_products/infra/typeorm/entities/OrderProduct';
import SplitPaymentWay from '@modules/splits_payment_way/infra/typeorm/entities/SplitPaymentWay';
import PaymentMethod from '@modules/payment_methods/infra/typeorm/entities/PaymentMethod';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  @Generated('increment')
  order_number: number;

  // ONE order can have ONE company
  @OneToOne(() => Company, company => company.id)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column()
  company_id: string;

  // ONE order can have ONE seller
  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column()
  seller_id: string;

  @Column()
  status_order: string;

  @Column('timestamp with time zone')
  approved_at: Date | null;

  @Column()
  delivery_conditions: string;

  @Column()
  technical_obs: string;

  @Column('timestamp with time zone')
  requested_delivery_date: Date | null;

  @Column('timestamp with time zone')
  delivery_date: Date | null;

  @Column()
  status_delivery: string;

  @Column()
  payment_way: string;

  // ONE order can have MANY splits_payment_way
  @OneToMany(
    () => SplitPaymentWay,
    splits_payment_way => splits_payment_way.order,
    {
      cascade: true,
    },
  )
  splits_payment_way: SplitPaymentWay[];

  @Column('timestamp with time zone')
  due_date: Date | null;

  // ONE order can have ONE payment_method
  @OneToOne(() => PaymentMethod, payment_method => payment_method.id)
  @JoinColumn({ name: 'payment_method_id' })
  payment_method: PaymentMethod;

  @Column()
  payment_method_id: string | null;

  @Column()
  status_billing: string;

  @Column()
  status_payment: string;

  // ONE order can have ONE technical
  @OneToOne(() => User, user => user.id)
  @JoinColumn({ name: 'technical_id' })
  technical: User;

  @Column()
  technical_id: string | null;

  @Column()
  total_value: string;

  // ONE order can have MANY orders_products
  @OneToMany(() => OrderProduct, orders_products => orders_products.order, {
    cascade: true,
  })
  orders_products: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
