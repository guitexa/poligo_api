import { Repository, getRepository, Brackets } from 'typeorm';
import { endOfDay, isValid, startOfDay } from 'date-fns';

import IOrdersRepository from '@modules/orders/repositories/IOrdersRepository';
import ICreateOrderDTO from '@modules/orders/dtos/ICreateOrderDTO';
import ISearchOrderDTO from '@modules/orders/dtos/ISearchOrderDTO';
import IFindAllOrdersDTO from '@modules/orders/dtos/IFindAllOrdersDTO';
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
  public async findAll({
    take,
    from,
  }: IFindAllOrdersDTO): Promise<Order[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.company', 'company')
      .leftJoinAndSelect('orders.seller', 'seller')
      .leftJoinAndSelect('orders.technical', 'technical')
      .leftJoinAndSelect('orders.orders_products', 'orders_products')
      .leftJoinAndSelect('orders_products.product', 'product');

    if (from === 'TechnicalArea') {
      // Função para filtrar por pedidos aprovados e que possuem status do pedido diferente de Cancelado e status de entrega diferente de Cancelado e status de entrega diferente de Entregue
      query.where(
        "orders.approved_at IS NOT NULL AND orders.status_order != 'Cancelado' AND orders.status_delivery != 'Cancelado' AND orders.status_delivery != 'Entregue'",
      );

      // Função para filtrar por pedidos aprovados e que não possuem status de entrega e status do pedido diferente de Cancelado e status de entrega diferente de Entregue
      query.orWhere(
        "orders.approved_at IS NOT NULL AND orders.status_delivery != '' AND orders.status_order != 'Cancelado' AND orders.status_delivery != 'Entregue'",
      );

      // Função para ordenar os resultados
      query.orderBy('orders.approved_at', 'DESC');
    }

    if (from === 'Billing') {
      // Função para filtrar por pedidos aprovados e que possuem status do pedido diferente de Cancelado e status de faturamento diferente de Cancelado e status de pagamento diferente de Cancelado e status de faturamento diferente Faturado
      query.where(
        "orders.approved_at IS NOT NULL AND orders.status_order != 'Cancelado' AND orders.status_billing != 'Cancelado' AND orders.status_payment != 'Cancelado' AND orders.status_billing != 'Faturado'",
      );

      // Função para filtrar por pedidos aprovados e que não possuem status de faturamento e status de pagamento diferente de Cancelado e status do pedido diferente de Cancelado e status de faturamento diferente Faturado
      query.orWhere(
        "orders.approved_at IS NOT NULL AND orders.status_billing != '' AND orders.status_billing != 'Cancelado' AND orders.status_order != 'Cancelado' AND orders.status_billing != 'Faturado'",
      );

      // Função para filtrar por pedidos aprovados e que possuem qualquer status de faturamento e status de pagamento diferente de Cancelado e status do pedido diferente de Cancelado e status de faturamento diferente Faturado
      query.orWhere(
        "orders.approved_at IS NOT NULL AND orders.status_billing = '' AND orders.status_billing != 'Cancelado' AND orders.status_order != 'Cancelado' AND orders.status_billing != 'Faturado'",
      );

      // Função para ordenar os resultados
      query.orderBy('orders.created_at', 'DESC');
    }

    if (from === 'Comercial') {
      // Função para filtrar por pedidos que possuem status do pedido diferente de Cancelado e diferente de Aprovado
      query.where(
        "orders.status_order != 'Cancelado' AND orders.status_order != 'Aprovado'",
      );

      // Função para ordenar os resultados
      query.orderBy('orders.created_at', 'DESC');
    }

    return (
      query
        // Função para não pular nenhum resultado
        .skip(0)
        // Função para limitar a quantidade de resultados
        .take(take)
        .getMany()
    );
  }

  // Função para procurar todas as orders cadastradas que possuem erros
  public async findAllWithErrors({
    take,
    from,
  }: IFindAllOrdersDTO): Promise<Order[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.company', 'company')
      .leftJoinAndSelect('orders.seller', 'seller')
      .leftJoinAndSelect('orders.technical', 'technical')
      .leftJoinAndSelect('orders.orders_products', 'orders_products')
      .leftJoinAndSelect('orders_products.product', 'product');

    if (from === 'TechnicalArea') {
      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da entrega ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_delivery != '' AND orders.status_delivery != 'Cancelado'",
      );

      // Função para filtrar por pedidos aprovados e/ou que possuem status de entrega
      query.andWhere(
        new Brackets(qb => {
          qb.where(
            "orders.approved_at IS NOT NULL OR orders.status_delivery != ''",
          );
        }),
      );

      // Função para ordenar os resultados
      query.orderBy('orders.approved_at', 'DESC');
    }

    if (from === 'Billing') {
      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da faturamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_billing != '' AND orders.status_billing != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da pagamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_payment != '' AND orders.status_payment != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e possuem e status da entrega diferente de Cancelado e status de pagamento Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_billing != 'Cancelado' AND orders.status_payment = 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e possuem e status da pedido diferente de Cancelado e status de entrega Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_payment != 'Cancelado' AND orders.status_billing = 'Cancelado'",
      );

      // Função para filtrar por pedidos aprovados e/ou que possuem status de faturamento
      query.andWhere(
        new Brackets(qb => {
          qb.where(
            "orders.approved_at IS NOT NULL OR orders.status_billing != ''",
          );
        }),
      );

      // Função para ordenar os resultados
      query.orderBy('orders.created_at', 'DESC');
    }

    if (from === 'Comercial') {
      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da entrega ou que seja diferente de Cancelado
      query.where(
        "orders.status_order = 'Cancelado' AND orders.status_delivery != '' AND orders.status_delivery != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da faturamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_billing != '' AND orders.status_billing != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da faturamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_payment = '' AND orders.status_billing != '' AND orders.status_billing != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da pagamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_payment != '' AND orders.status_payment != 'Cancelado'",
      );

      // Função para filtrar por pedidos que possuem status do pedido Cancelado e não possuem e status da pagamento ou que seja diferente de Cancelado
      query.orWhere(
        "orders.status_order = 'Cancelado' AND orders.status_billing = '' AND orders.status_payment != '' AND orders.status_payment != 'Cancelado'",
      );

      // Função para ordenar os resultados
      query.orderBy('orders.created_at', 'DESC');
    }

    return (
      query
        // Função para não pular nenhum resultado
        .skip(0)
        // Função para limitar a quantidade de resultados
        .take(take)
        .getMany()
    );
  }

  // Função para procurar uma order específica
  public async findById(order_id: string): Promise<Order | undefined> {
    const order = await this.ormRepository.findOne({
      where: {
        id: order_id,
      },
      relations: ['company', 'seller', 'technical', 'orders_products'],
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
    const order_updated = await this.ormRepository.save(order);

    const findOrder = await this.ormRepository.findOne({
      where: {
        id: order.id,
      },
      relations: ['company', 'seller', 'technical', 'orders_products'],
    });

    if (findOrder) {
      return findOrder;
    }
    return order_updated;
  }

  // Função para procurar informações dentro das orders existentes
  public async search({
    approved_at,
    created_at,
    delivery_date,
    technical,
    company_name,
    seller,
    status_order,
    status_delivery,
    status_billing,
    total_value,
    products,
    take,
    from,
  }: ISearchOrderDTO): Promise<Order[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('orders')
      .leftJoinAndSelect('orders.company', 'company')
      .leftJoinAndSelect('orders.seller', 'seller')
      .leftJoinAndSelect('orders.technical', 'technical')
      .leftJoinAndSelect('orders.orders_products', 'orders_products')
      .leftJoinAndSelect('orders_products.product', 'product');

    if (company_name) {
      // Função para filtrar pelo nome da empresa
      query.andWhere('company.name ILIKE :company_name', {
        company_name: `%${company_name}%`,
      });
    }

    if (status_order) {
      // Função para filtrar pelo status do pedido
      query.andWhere('orders.status_order ILIKE :status_order', {
        status_order: `%${status_order}%`,
      });
    }

    if (status_delivery) {
      // Função para filtrar pelo status da entrega
      query.andWhere('orders.status_delivery ILIKE :status_delivery', {
        status_delivery: `%${status_delivery}%`,
      });
    }

    if (status_billing) {
      // Função para filtrar pelo status do faturamento
      query.andWhere('orders.status_billing ILIKE :status_billing', {
        status_billing: `%${status_billing}%`,
      });
    }

    if (seller) {
      // Função para filtrar pelo nome do vendedor
      query.andWhere('seller.name ILIKE :seller', {
        seller: `%${seller}%`,
      });
    }

    if (total_value) {
      // Função para filtrar pelo valor total do pedido
      query.andWhere('orders.total_value ILIKE :total_value', {
        total_value: `%${total_value}%`,
      });
    }

    if (approved_at) {
      if (isValid(new Date(approved_at))) {
        // Função para filtrar pela data de aprovação do pedido
        query.andWhere(
          'orders.approved_at BETWEEN :start_approved_at AND :end_approved_at',
          {
            start_approved_at: startOfDay(new Date(approved_at)),
            end_approved_at: endOfDay(new Date(approved_at)),
          },
        );
      }
    }

    if (created_at) {
      if (isValid(new Date(created_at))) {
        // Função para filtrar pela data de criação do pedido
        query.andWhere(
          'orders.created_at BETWEEN :start_created_at AND :end_created_at',
          {
            start_created_at: startOfDay(new Date(created_at)),
            end_created_at: endOfDay(new Date(created_at)),
          },
        );
      }
    }

    if (delivery_date) {
      if (isValid(new Date(delivery_date))) {
        // Função para filtrar pela data de entrega do pedido
        query.andWhere(
          'orders.delivery_date BETWEEN :start_delivery_date AND :end_delivery_date',
          {
            start_delivery_date: startOfDay(new Date(delivery_date)),
            end_delivery_date: endOfDay(new Date(delivery_date)),
          },
        );
      }
    }

    if (technical) {
      // Função para filtrar pelo nome dos técnicos
      query.andWhere('technical.name ILIKE :technical', {
        technical: `%${technical}%`,
      });
    }

    if (products) {
      // Função para filtrar pelo nome dos produtos
      query.andWhere('product.name ILIKE :products', {
        products: `%${products}%`,
      });
    }

    if (from === 'TechnicalArea') {
      // Função para filtrar por pedidos aprovados e/ou que possuem status de entrega
      query.andWhere(
        new Brackets(qb => {
          qb.where(
            "orders.approved_at IS NOT NULL AND orders.status_order != 'Cancelado' OR orders.status_delivery != ''",
          );
        }),
      );
    }

    if (from === 'Billing') {
      // Função para filtrar por pedidos aprovados e/ou que possuem status de faturamento
      query.andWhere(
        new Brackets(qb => {
          qb.where(
            "orders.approved_at IS NOT NULL AND orders.status_order != 'Cancelado' OR orders.status_billing != ''",
          );
        }),
      );
    }

    if (from === 'Comercial' || from === 'Billing') {
      // Função para ordenar os resultados
      query.orderBy('orders.created_at', 'DESC');
    }

    if (from === 'TechnicalArea') {
      // Função para ordenar os resultados
      query.orderBy('orders.approved_at', 'DESC');
    }

    return (
      query
        // Função para não pular nenhum resultado
        .skip(0)
        // Função para limitar a quantidade de resultados
        .take(take)
        .getMany()
    );
  }
}
