import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddProductPaymentTypeFieldToOrdersProducts1629134865897
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders_products',
      new TableColumn({
        name: 'product_payment_type',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders_products', 'product_payment_type');
  }
}
