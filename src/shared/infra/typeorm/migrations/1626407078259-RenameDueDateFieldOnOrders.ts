import { MigrationInterface, QueryRunner } from 'typeorm';

export default class RenameDueDateFieldOnOrders1626407078259
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('orders', 'due_date', 'due_date_old');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.renameColumn('orders', 'due_date_old', 'due_date');
  }
}
