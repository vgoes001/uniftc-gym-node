import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddEquipmentIdToAppointmentsEquipments1606075548130
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments_equipments',
      new TableColumn({
        name: 'equipment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments_equipments',
      new TableForeignKey({
        name: 'EquipmentsAppointmentsEquipment',
        columnNames: ['equipment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'equipments',
        onDelete: `SET NULL`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments_equipments',
      'EquipmentsAppointmentsEquipment',
    );

    await queryRunner.dropColumn('appointments_equipments', 'equipment_id');
  }
}
