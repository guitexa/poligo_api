import { Repository, getRepository, Like, Between } from 'typeorm';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import ISearchOrderDTO from '@modules/orders/dtos/ISearchOrderDTO';
import { endOfDay, isValid, startOfDay } from 'date-fns';
import Order from '../entities/Order';

export default class OrdersRepository implements IOrdersRepository {
  private ormRepository: Repository<Order>;

  constructor() {
    this.ormRepository = getRepository(Order);
  }

  public async create(orderData: ICreateOrderDTO): Promise<Order> {
    const order = this.ormRepository.create(orderData);

    await this.ormRepository.save(order);

    return order;
  }

  public async findAll(): Promise<Order[] | undefined> {
    return this.ormRepository.find({
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });
  }

  public async findById(order_id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });

    return order;
  }

  public async findByIdWithoutRelations(
    order_id: string,
  ): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
    });

    return order;
  }

  public async save(order: Order): Promise<Order> {
    await this.ormRepository.save(order);

    const findOrder = await this.ormRepository.findOne({
      where: {
        id: order.id,
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });

    if (findOrder) {
      return findOrder;
    }
    return this.ormRepository.save(order);
  }

  public async search({
    created_at,
    company,
    seller,
    technical,
    // product,
    total_value,
    status_order,
    status_delivery,
    status_billing,
  }: ISearchOrderDTO): Promise<Order[] | undefined> {
    const start_created_at = startOfDay(created_at || 0);
    const end_created_at = endOfDay(created_at || 0);

    if (technical) {
      if (isValid(created_at)) {
        return this.ormRepository.find({
          join: {
            alias: 'orders',
            innerJoin: {
              client: 'orders.client',
              seller: 'orders.seller',
              technical: 'orders.technical',
            },
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          where: qb => {
            qb.where({
              created_at: Between(start_created_at, end_created_at),
            });
            qb.andWhere('client.name ILIKE :clientName', {
              clientName: `%${company}%`,
            });
            qb.andWhere('seller.name ILIKE :sellerName', {
              sellerName: `%${seller}%`,
            });
            qb.andWhere('technical.name ILIKE :technicalName', {
              technicalName: `%${technical}%`,
            });
            qb.andWhere({
              total_value: Like(`%${total_value}%`),
            });
            qb.andWhere({
              status_order: Like(`%${status_order}%`),
            });
            qb.andWhere({
              status_delivery: Like(`%${status_delivery}%`),
            });
            qb.andWhere({
              status_billing: Like(`%${status_billing}%`),
            });
          },
          relations: ['client', 'seller', 'technical', 'orders_products'],
        });
      }
      return this.ormRepository.find({
        join: {
          alias: 'orders',
          innerJoin: {
            client: 'orders.client',
            seller: 'orders.seller',
            technical: 'orders.technical',
          },
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        where: qb => {
          qb.where('client.name ILIKE :clientName', {
            clientName: `%${company}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('technical.name ILIKE :technicalName', {
            technicalName: `%${technical}%`,
          });
          qb.andWhere({
            total_value: Like(`%${total_value}%`),
          });
          qb.andWhere({
            status_order: Like(`%${status_order}%`),
          });
          qb.andWhere({
            status_delivery: Like(`%${status_delivery}%`),
          });
          qb.andWhere({
            status_billing: Like(`%${status_billing}%`),
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }
    if (isValid(created_at)) {
      return this.ormRepository.find({
        join: {
          alias: 'orders',
          innerJoin: {
            client: 'orders.client',
            seller: 'orders.seller',
          },
        },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        where: qb => {
          qb.where({
            created_at: Between(start_created_at, end_created_at),
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${company}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere({
            total_value: Like(`%${total_value}%`),
          });
          qb.andWhere({
            status_order: Like(`%${status_order}%`),
          });
          qb.andWhere({
            status_delivery: Like(`%${status_delivery}%`),
          });
          qb.andWhere({
            status_billing: Like(`%${status_billing}%`),
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    return (
      this.ormRepository
        //   .createQueryBuilder('orders')
        //   .where('orders.orders_products IN (:orderProduct')
        //   .setParameter('orderProduct', productName)
        //   .getOne();

        // return this.ormRepository
        //   .createQueryBuilder('orders') // busca na tabela orders
        //   .where('orders.orders_products.product @> ARRAY[:orders_products]', {
        //     // procura dentro do array orders_products
        //     orders_products: productName, // o valor do name dentro do objeto product
        //   })
        //   .getOne();

        .find({
          join: {
            alias: 'orders',
            innerJoin: {
              client: 'orders.client',
              seller: 'orders.seller',
              // orders_products: 'orders.orders_products',
            },
          },
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          where: qb => {
            qb.where('client.name ILIKE :clientName', {
              clientName: `%${company}%`,
            });
            // qb.andWhere({
            //   orders_products: oqb => {
            //     oqb.where('orders_products.product ILIKE :productName', {
            //       productName: `%${product}%`,
            //     }),
            //   },
            // });
            qb.andWhere('seller.name ILIKE :sellerName', {
              sellerName: `%${seller}%`,
            });
            qb.andWhere({
              total_value: Like(`%${total_value}%`),
            });
            qb.andWhere({
              status_order: Like(`%${status_order}%`),
            });
            qb.andWhere({
              status_delivery: Like(`%${status_delivery}%`),
            });
            qb.andWhere({
              status_billing: Like(`%${status_billing}%`),
            });
          },
          relations: ['client', 'seller', 'technical', 'orders_products'],
        })
    );
  }
}
