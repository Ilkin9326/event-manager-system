export interface IEventGuest {
  eg_id: number;
  event_id: number;
  full_name: string;
  organization?: string;
  position?: string;
  id_number?: string;
  has_vehicle: boolean;
  vehicle_plate_number?: string;
  vehicle_model?: string;
  is_entered: boolean;
  entry_time?: Date;
}
