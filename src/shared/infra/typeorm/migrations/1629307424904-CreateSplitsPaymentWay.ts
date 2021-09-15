import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSplitsPaymentWay1629307424904
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'splits_payment_way',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'payment_way',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'split_number',
            type: 'decimal',
            precision: 2,
            scale: 0,
            isNullable: true,
          },
          {
            name: 'split_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'split_due_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'payment_method_id',
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
    await queryRunner.dropTable('splits_payment_way');
  }
}
