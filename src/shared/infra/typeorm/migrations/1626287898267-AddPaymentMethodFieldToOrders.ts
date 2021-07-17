import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddPaymentMethodFieldToOrders1626287898267
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'payment_method_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'payment_method');
  }
}
