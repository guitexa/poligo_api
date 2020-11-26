import { Repository, getRepository, Between } from 'typeorm';

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

  // Função para criar uma order
  public async create(order: ICreateOrderDTO): Promise<Order> {
    const newOrder = this.ormRepository.create(order);

    await this.ormRepository.save(newOrder);

    return newOrder;
  }

  // Função para procurar todas as orders cadastradas
  public async findAll(): Promise<Order[] | undefined> {
    return this.ormRepository.find({
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });
  }

  // Função para procurar uma order específica
  public async findById(order_id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });

    return order;
  }

  // Função para procurar uma order específica porém sem trazer os relacionamentos
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

  // Função para atualizar uma order específica
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

  // Função para procurar informações dentro das orders existentes
  public async search({
    created_at,
    delivery_date,
    technical,
    client_name,
    products,
    seller,
    total_value,
    status_order,
    status_delivery,
    status_billing,
  }: ISearchOrderDTO): Promise<Order[] | undefined> {
    const start_created_at = startOfDay(created_at || 0);
    const end_created_at = endOfDay(created_at || 0);

    const start_delivery_date = startOfDay(delivery_date || 0);
    const end_delivery_date = endOfDay(delivery_date || 0);

    // Se houver technical, created_at e não houver delivery_date
    if (technical && isValid(created_at) && !isValid(delivery_date)) {
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
          qb.andWhere('technical.name ILIKE :technicalName', {
            technicalName: `%${technical}%`,
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se houver technical e não houver created_at e delivery_date
    if (technical && !isValid(created_at) && !isValid(delivery_date)) {
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
          qb.where('technical.name ILIKE :technicalName', {
            technicalName: `%${technical}%`,
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se houver technical, não houver created_at e houver delivery_date
    if (technical && !isValid(created_at) && isValid(delivery_date)) {
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
            delivery_date: Between(start_delivery_date, end_delivery_date),
          });
          qb.andWhere('technical.name ILIKE :technicalName', {
            technicalName: `%${technical}%`,
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se não houver technical, houver created_at e delivery_date
    if (!technical && isValid(created_at) && isValid(delivery_date)) {
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
          qb.andWhere({
            delivery_date: Between(start_delivery_date, end_delivery_date),
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se não houver technical, houver created_at e não houver delivery_date
    if (!technical && isValid(created_at) && !isValid(delivery_date)) {
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
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se houver technical, created_at e delivery_date
    if (!technical && !isValid(created_at) && isValid(delivery_date)) {
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
            delivery_date: Between(start_delivery_date, end_delivery_date),
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se houver technical, created_at e delivery_date
    if (!technical && isValid(created_at) && isValid(delivery_date)) {
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
          qb.andWhere({
            delivery_date: Between(start_delivery_date, end_delivery_date),
          });
          qb.andWhere('technical.name ILIKE :technicalName', {
            technicalName: `%${technical}%`,
          });
          qb.andWhere('client.name ILIKE :clientName', {
            clientName: `%${client_name}%`,
          });
          qb.andWhere('seller.name ILIKE :sellerName', {
            sellerName: `%${seller}%`,
          });
          qb.andWhere('orders.products ILIKE :orderProducts', {
            orderProducts: `%${products}%`,
          });
          qb.andWhere('orders.total_value ILIKE :totalValue', {
            totalValue: `%${total_value}%`,
          });
          qb.andWhere('orders.status_order ILIKE :statusOrder', {
            statusOrder: `%${status_order}%`,
          });
          qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
            statusDelivery: `%${status_delivery}%`,
          });
          qb.andWhere('orders.status_billing ILIKE :statusBilling', {
            statusBilling: `%${status_billing}%`,
          });
        },
        relations: ['client', 'seller', 'technical', 'orders_products'],
      });
    }

    // Se não houver technical, created_at e delivery_date
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
        qb.where('client.name ILIKE :clientName', {
          clientName: `%${client_name}%`,
        });
        qb.andWhere('seller.name ILIKE :sellerName', {
          sellerName: `%${seller}%`,
        });
        qb.andWhere('orders.products ILIKE :orderProducts', {
          orderProducts: `%${products}%`,
        });
        qb.andWhere('orders.total_value ILIKE :totalValue', {
          totalValue: `%${total_value}%`,
        });
        qb.andWhere('orders.status_order ILIKE :statusOrder', {
          statusOrder: `%${status_order}%`,
        });
        qb.andWhere('orders.status_delivery ILIKE :statusDelivery', {
          statusDelivery: `%${status_delivery}%`,
        });
        qb.andWhere('orders.status_billing ILIKE :statusBilling', {
          statusBilling: `%${status_billing}%`,
        });
      },
      relations: ['client', 'seller', 'technical', 'orders_products'],
    });
  }
}
