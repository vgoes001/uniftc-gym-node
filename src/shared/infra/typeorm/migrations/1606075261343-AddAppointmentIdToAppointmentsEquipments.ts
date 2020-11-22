import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddAppointmentIdToAppointmentsEquipments1606075261343
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments_equipments',
      new TableColumn({
        name: 'appointment_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'appointments_equipments',
      new TableForeignKey({
        name: 'AppointmentsEquipmentsAppointment',
        columnNames: ['appointment_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'appointments',
        onDelete: `SET NULL`,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey(
      'appointments_equipments',
      'AppointmentsEquipmentsAppointment',
    );

    await queryRunner.dropColumn('appointments_equipments', 'appointment_id');
  }
}
