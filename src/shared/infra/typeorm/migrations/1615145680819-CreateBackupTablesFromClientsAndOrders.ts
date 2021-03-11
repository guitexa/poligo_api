import { MigrationInterface, QueryRunner } from 'typeorm';

export default class CreateBackupTablesFromClientsAndOrders1615145680819
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE clients_backup AS TABLE clients;');

    await queryRunner.query('CREATE TABLE orders_backup AS TABLE orders;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('clients_backup');

    await queryRunner.dropTable('orders_backup');
  }
}
