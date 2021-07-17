import { Repository, getRepository } from 'typeorm';
import { endOfDay, isValid, startOfDay } from 'date-fns';

import IFinancialsRepository from '@modules/financials/repositories/IFinancialsRepository';
import ICreateFinancialDTO from '@modules/financials/dtos/ICreateFinancialDTO';
import IFindAllFinancialsDTO from '@modules/financials/dtos/IFindAllFinancialsDTO';
import ISearchFinancialDTO from '@modules/financials/dtos/ISearchFinancialDTO';
import Financial from '../entities/Financial';

export default class FinancialsRepository implements IFinancialsRepository {
  private ormRepository: Repository<Financial>;

  constructor() {
    this.ormRepository = getRepository(Financial);
  }

  // Função para criar um lançamento financeiro
  public async create(financial: ICreateFinancialDTO): Promise<Financial> {
    const newFinancial = this.ormRepository.create(financial);

    await this.ormRepository.save(newFinancial);

    return newFinancial;
  }

  // Função para mostrar todos os lançamentos financeiros cadastrados exceto os que vencem na data corrente
  public async findAll({
    take,
  }: // from,
  IFindAllFinancialsDTO): Promise<Financial[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('financials')
      .leftJoinAndSelect('financials.bank_account', 'bank_account')
      .leftJoinAndSelect('financials.user', 'user')
      .leftJoinAndSelect('financials.company', 'company')
      .leftJoinAndSelect('financials.order', 'order');

    // Função para filtrar lançamentos financeiros exceto os que vencem na corrente data
    query.where(
      'financials.replan_date < :start_current_date OR financials.replan_date > :end_current_date OR financials.paid_date IS NOT NULL',
      {
        start_current_date: startOfDay(new Date(Date.now())),
        end_current_date: endOfDay(new Date(Date.now())),
      },
    );

    // Função para ordenar os resultados
    query.orderBy('financials.replan_date', 'DESC');

    return (
      query
        // Função para não pular nenhum resultado
        .skip(0)
        // Função para limitar a quantidade de resultados
        .take(take)
        .getMany()
    );
  }

  // Função para procurar um lançamento financeiro específico pelo ID
  public async findById(financial_id: string): Promise<Financial | undefined> {
    const financial = await this.ormRepository.findOne({
      where: {
        id: financial_id,
      },
      relations: ['bank_account', 'user', 'company', 'order'],
    });

    return financial;
  }

  // Função para mostrar os lançamentos financeiros que vencem no dia corrente
  public async findAllTodayDueDate({
    take,
  }: // from,
  IFindAllFinancialsDTO): Promise<Financial[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('financials')
      .leftJoinAndSelect('financials.bank_account', 'bank_account')
      .leftJoinAndSelect('financials.user', 'user')
      .leftJoinAndSelect('financials.company', 'company')
      .leftJoinAndSelect('financials.order', 'order');

    // Função para filtrar lançamentos financeiros que vencem na data corrente
    query.andWhere(
      'financials.replan_date BETWEEN :start_replan_date AND :end_replan_date AND financials.paid_date IS NULL',
      {
        start_replan_date: startOfDay(new Date(Date.now())),
        end_replan_date: endOfDay(new Date(Date.now())),
      },
    );

    // Função para ordenar os resultados
    query.orderBy('financials.replan_date', 'DESC');

    return (
      query
        // Função para não pular nenhum resultado
        .skip(0)
        // Função para limitar a quantidade de resultados
        .take(take)
        .getMany()
    );
  }

  // Função para atualizar um lançamento específico
  public async save(financial: Financial): Promise<Financial> {
    const financial_updated = await this.ormRepository.save(financial);

    const findOrder = await this.ormRepository.findOne({
      where: {
        id: financial.id,
      },
    });

    if (findOrder) {
      return findOrder;
    }
    return financial_updated;
  }

  // Função para procurar informações dentro dos lançamentos financeiros
  public async search({
    due_date,
    replan_date,
    gross_value,
    net_value,
    paid_date,
    paid_value,
    company_name,
    bank_account,
    status_financial,
    take,
  }: // from,
  ISearchFinancialDTO): Promise<Financial[] | undefined> {
    const query = this.ormRepository
      .createQueryBuilder('financials')
      .leftJoinAndSelect('financials.bank_account', 'bank_account')
      .leftJoinAndSelect('financials.user', 'user')
      .leftJoinAndSelect('financials.company', 'company')
      .leftJoinAndSelect('financials.order', 'order');

    if (due_date) {
      if (isValid(new Date(due_date))) {
        // Função para filtrar pela data de vencimento
        query.andWhere(
          'financials.due_date BETWEEN :start_due_date AND :end_due_date',
          {
            start_due_date: startOfDay(new Date(due_date)),
            end_due_date: endOfDay(new Date(due_date)),
          },
        );
      }
    }

    if (replan_date) {
      if (isValid(new Date(replan_date))) {
        // Função para filtrar pela data de replanejamento
        query.andWhere(
          'financials.replan_date BETWEEN :start_replan_date AND :end_replan_date',
          {
            start_replan_date: startOfDay(new Date(replan_date)),
            end_replan_date: endOfDay(new Date(replan_date)),
          },
        );
      }
    }

    if (bank_account) {
      // Função para filtrar pela conta bancária
      query.andWhere('bank_account.name ILIKE :bank_account', {
        bank_account: `%${bank_account}%`,
      });
    }

    if (gross_value) {
      // Função para filtrar pelo valor bruto
      query.andWhere('financials.gross_value_string ILIKE :gross_value', {
        gross_value: `%${gross_value}%`,
      });
    }

    if (net_value) {
      // Função para filtrar pelo valor líquido
      query.andWhere('financials.net_value_string ILIKE :net_value', {
        net_value: `%${net_value}%`,
      });
    }

    if (paid_date) {
      if (isValid(new Date(paid_date))) {
        // Função para filtrar pela data de pagamento
        query.andWhere(
          'financials.paid_date BETWEEN :start_paid_date AND :end_paid_date',
          {
            start_paid_date: startOfDay(new Date(paid_date)),
            end_paid_date: endOfDay(new Date(paid_date)),
          },
        );
      }
    }

    if (paid_value) {
      // Função para filtrar pelo valor pago
      query.andWhere('financials.paid_value_string ILIKE :paid_value', {
        paid_value: `%${paid_value}%`,
      });
    }

    if (company_name) {
      // Função para filtrar pelo nome da empresa
      query.andWhere('company.name ILIKE :company_name', {
        company_name: `%${company_name}%`,
      });
    }

    if (status_financial === 'Hoje') {
      // Função para filtrar lançamentos financeiros que vencem na data corrente
      query.andWhere(
        'financials.replan_date BETWEEN :start_replan_date AND :end_replan_date AND financials.paid_date IS NULL',
        {
          start_replan_date: startOfDay(new Date(Date.now())),
          end_replan_date: endOfDay(new Date(Date.now())),
        },
      );
    }

    if (status_financial === 'Pago') {
      // Função para filtrar lançamentos financeiros pagos
      query.andWhere('financials.paid_date IS NOT NULL');
    }

    if (status_financial === 'Vencido') {
      // Função para filtrar lançamentos financeiros vencidos e diferente da categoria 'Protesto'
      query.andWhere(
        "financials.replan_date < :current_date AND financials.paid_date IS NULL AND financials.category != 'Protesto'",
        {
          current_date: startOfDay(new Date(Date.now())),
        },
      );
    }

    if (status_financial === 'Agendado') {
      // Função para filtrar lançamentos financeiros futuros em aberto
      query.andWhere(
        'financials.replan_date > :current_date AND financials.paid_date IS NULL',
        {
          current_date: endOfDay(new Date(Date.now())),
        },
      );
    }

    if (status_financial === 'Cancelado') {
      // Função para filtrar lançamentos financeiros vencidos e que seja da categoria 'Protesto'
      query.andWhere(
        "financials.replan_date < :current_date AND financials.paid_date IS NULL AND financials.category = 'Protesto'",
        {
          current_date: endOfDay(new Date(Date.now())),
        },
      );
    }

    // Função para ordenar os resultados
    query.orderBy('financials.replan_date', 'DESC');

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
