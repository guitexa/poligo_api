import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToMany,
  Generated,
} from 'typeorm';

import Client from '@modules/clients/infra/typeorm/entities/Client';
import User from '@modules/users/infra/typeorm/entities/User';
import Product from '@modules/products/infra/typeorm/entities/Product';

@Entity('orders')
export default class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Generated('increment')
  order_number: number;

  @Column()
  client_id: string;

  // MANY orders to MANY clients
  @ManyToMany(() => Client)
  @JoinColumn({ name: 'client_id' })
  clients: Client;

  @Column()
  seller_id: string;

  // MANY sellers to MANY orders
  @ManyToMany(() => User)
  @JoinColumn({ name: 'seller_id' })
  seller: User;

  @Column()
  total_value: number;

  @Column()
  status_order: string;

  @Column('timestamp with time zone')
  approved_at: Date;

  @Column()
  delivery_conditions: string;

  @Column('timestamp with time zone')
  requested_delivery_date: Date;

  @Column('timestamp with time zone')
  delivery_date: Date;

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

  @Column()
  product_id: string;

  // MANY products to MANY orders
  @ManyToMany(() => Product)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  product_description: string;

  @Column()
  product_value: number;

  @Column()
  technical_id: string;

  // MANY technicals to MANY orders
  @ManyToMany(() => User)
  @JoinColumn({ name: 'technical_id' })
  technical: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
