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

  @Column('timestamp with time zone')
  requested_delivery_date: Date | null;

  @Column('timestamp with time zone')
  delivery_date: Date | null;

  @Column()
  status_delivery: string;

  @Column()
  payment_way: string;

  @Column()
  due_date: string;

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
