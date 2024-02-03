import { Equipment } from './equipment';
import { User } from './user';

export interface EquipmentSelection {
  id?: string;
  equipment: Equipment;
  quantity: number;
  user?: User;
}
