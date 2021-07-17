import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddNewDueDateFieldOnOrders1626407114111
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'due_date',
        type: 'timestamp with time zone',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'due_date');
  }
}
