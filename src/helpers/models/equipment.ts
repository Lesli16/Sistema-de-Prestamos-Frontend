import { EquipmentClassification } from "./equipment-classification";

export interface Equipment {
  id?: string;
  image: string;
  name: string;
  model?: string;
  description?: string;
  stock: number;
  equipmentClassification: EquipmentClassification; // Asegúrate de tener una interfaz para EquipmentClassification
  availableQuantity?: number;
  inMaintenanceQuantity?: number;
  onLoanQuantity?: number;
  quantity:number
}
