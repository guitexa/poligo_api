import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFinancials1615661643764
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'financials',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'entry_number',
            type: 'int',
            isUnique: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'company_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'cost_type',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'gross_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'gross_value_string',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'net_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'net_value_string',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'nf_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'boleto_number',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'replan_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'paid_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'paid_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'paid_value_string',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'interest_rate',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'interest_rate_string',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'updated_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'updated_value_string',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'initial_competence',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'final_competence',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'cost_center',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'category',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'bank_account_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'charge_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'before_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'at_day_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'two_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'four_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'seven_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'twelve_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'twenty_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'thirty_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'forty_five_days_status_charge',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('financials');
  }
}
