import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class CreateForeignKeyOnOrders1629307802884
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createForeignKey(
      'splits_payment_way',
      new TableForeignKey({
        name: 'SplitsPaymentWayOrder',
        columnNames: ['order_id'],
        referencedTableName: 'orders',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
      }),
    );

    await queryRunner.createForeignKey(
      'splits_payment_way',
      new TableForeignKey({
        name: 'PaymentMethodsId',
        columnNames: ['payment_method_id'],
        referencedTableName: 'payment_methods',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('splits_payment_way', 'PaymentMethodsId');

    await queryRunner.dropForeignKey(
      'splits_payment_way',
      'SplitsPaymentWayOrder',
    );
  }
}
