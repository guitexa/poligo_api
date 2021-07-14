import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class RenameTableNameAndColumnName1615146036616
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'ClientId');

    await queryRunner.renameTable('clients', 'companies');

    await queryRunner.renameColumn('orders', 'client_id', 'company_id');

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'CompanyId',
        columnNames: ['company_id'],
        referencedTableName: 'companies',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('orders', 'CompanyId');

    await queryRunner.renameColumn('orders', 'company_id', 'client_id');

    await queryRunner.renameTable('companies', 'clients');

    await queryRunner.createForeignKey(
      'orders',
      new TableForeignKey({
        name: 'ClientId',
        columnNames: ['client_id'],
        referencedTableName: 'clients',
        referencedColumnNames: ['id'],
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
