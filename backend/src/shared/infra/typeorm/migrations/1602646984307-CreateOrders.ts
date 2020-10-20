import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateOrders1602646984307 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'orders',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'order_number',
            type: 'int',
            isUnique: true,
            generationStrategy: 'increment',
          },
          {
            name: 'client_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'seller_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'total_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'status_order',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'approved_at',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'delivery_conditions',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'requested_delivery_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'delivery_date',
            type: 'timestamp with time zone',
            isNullable: true,
          },
          {
            name: 'status_delivery',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'payment_way',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'due_date',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_billing',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status_payment',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product_id',
            type: 'uuid',
            isNullable: true,
          },
          {
            name: 'product_description',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'product_value',
            type: 'decimal',
            precision: 10,
            scale: 2,
            isNullable: true,
          },
          {
            name: 'technical_id',
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
    await queryRunner.dropTable('orders');
  }
}
