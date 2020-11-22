interface IEquipment {
  equipment_id: string;
}
export default interface ICreateAppointmentDTO {
  user_id: string;
  date: Date;
  equipments: IEquipment[];
}
