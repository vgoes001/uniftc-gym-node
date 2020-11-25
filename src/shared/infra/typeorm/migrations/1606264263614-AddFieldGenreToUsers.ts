import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFieldGenreToUsers1606264263614
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'genre',
        type: 'varchar',
        enum: ['male', 'female'],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'genre');
  }
}
