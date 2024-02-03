import { Equipment } from 'src/helpers/models/equipment';
import { Component, OnInit, ViewChild } from '@angular/core';
import { EquipmentService } from 'src/helpers/service/equipment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { EquipmentSelectionService } from 'src/helpers/service/equipment-selection.service';
import { EquipmentSelection } from 'src/helpers/models/equipment-selection';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-equipment-list',
  templateUrl: './equipment-list.component.html',
  styleUrls: ['./equipment-list.component.scss'],
})
export class EquipmentListComponent implements OnInit {
  @ViewChild('dv') dv!: DataView;
  equipments: Equipment[] = [];
  equipmentStatus: string = '';
  options: SelectItem[] = [];

  constructor(
    private equipmentSrv: EquipmentService,
    private sanitizer: DomSanitizer,
    private equipmentSelectionSrv: EquipmentSelectionService,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllEquipments();
    this.options = [
      { label: 'Disponibles', value: 'disponibles' },
      { label: 'Todos', value: 'todos' },
    ];
  }

  onSortChange(event: any) {
    let value = event.value;
    if (value === 'disponibles') {
      this.equipments = this.equipments.filter((data) => {
        return (
          data.availableQuantity !== undefined && data.availableQuantity > 0
        );
      });
    } else {
      this.getAllEquipments()
    }
  }

  getAllEquipments() {
    this.equipmentSrv.getAllEquipments().subscribe({
      next: (data) => {
        this.equipments = data.map((equipment) => {
          return { ...equipment, quantity: 1 };
        });
      },
    });
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getEquipmentStatus(equipment: Equipment) {
    if (
      equipment.availableQuantity !== undefined &&
      equipment.availableQuantity > 0
    ) {
      return 'Disponible';
    } else {
      return 'Agotado';
    }
  }

  getSeverity(equipment: Equipment) {
    switch (true) {
      case equipment.availableQuantity !== undefined &&
        equipment.availableQuantity > 0:
        return 'success';

      case equipment.availableQuantity !== undefined &&
        equipment.availableQuantity === 0:
        return 'danger';
      default:
        return 'null';
    }
  }

  addEquipmentToCar(equipment: Equipment) {
    console.log(
      `Añadir ${equipment.quantity} unidades de ${equipment.name} al carrito`
    );

    let equipmentSelection:EquipmentSelection ={
      equipment:equipment,
      quantity:equipment.quantity
    }

    this.equipmentSelectionSrv.createEquipmentSelection(equipmentSelection).subscribe({
      next: data => {
        this.toastSrv.success(data.response, '', {
          positionClass: 'toast-top-center',
        });
      },error: err =>{
        this.toastSrv.warning(err.error.response, 'Advertencia', {
          positionClass: 'toast-top-center',
        });
      }
    })
  }


}
