import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddTechnicalObsFieldToOrders1626287876185
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'orders',
      new TableColumn({
        name: 'technical_obs',
        type: 'varchar',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('orders', 'technical_obs');
  }
}
