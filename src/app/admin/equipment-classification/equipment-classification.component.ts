import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { EquipmentClassification } from 'src/helpers/models/equipment-classification';
import { EquipmentClassificationService } from 'src/helpers/service/equipment-classification.service';

@Component({
  selector: 'app-equipment-classification',
  templateUrl: './equipment-classification.component.html',
  styleUrls: ['./equipment-classification.component.scss'],
})
export class EquipmentClassificationComponent implements OnInit {
  equipmentClassifications: EquipmentClassification[] = [];

  equipmentDialog: boolean = false;
  equipmentClassification: EquipmentClassification =
    {} as EquipmentClassification;
  submitted: boolean = false;

  dialogTitle:string = "";
  constructor(
    private equipmentClassificationSrv: EquipmentClassificationService,
    private toastSrv: ToastrService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllEquipmentsClassification();
  }
  handleEquipmentClassification(
    equipmentClassification: EquipmentClassification
  ) {
    if (equipmentClassification.id) {
      this.updateEquipmentClassification();
    } else {
      this.createEquipmentClassification(equipmentClassification);
    }
  }

  openEditDialog(equipmentClassification: EquipmentClassification) {
    this.equipmentDialog = true;
    this.dialogTitle = 'Editar categoría'
    this.equipmentClassification = { ...equipmentClassification };
  }

  createEquipmentClassification(
    equipmentClassification: EquipmentClassification
  ) {
    this.equipmentClassificationSrv
      .createEquipmentClassification(equipmentClassification)
      .subscribe({
        next: (data) => {
          this.toastSrv.success(data.response, '', {
            positionClass: 'toast-top-center',
          });
          this.equipmentDialog = false;
          this.getAllEquipmentsClassification();
        },
        error: (err) => {
          this.toastSrv.error(err.error.response, 'Intento fallido', {
            positionClass: 'toast-top-center',
          });
          this.submitted = true;
        },
      });
  }

  updateEquipmentClassification() {
    this.equipmentClassificationSrv
      .updateEquipmentClassification(this.equipmentClassification)
      .subscribe({
        next: (data) => {
          this.toastSrv.success(data.response, '', {
            positionClass: 'toast-top-center',
          });
          this.equipmentDialog = false;
          this.getAllEquipmentsClassification()
          this.equipmentClassification = {} as EquipmentClassification
        },
        error: (err) => {
          this.toastSrv.error(err.error.response, 'Intento fallido', {
            positionClass: 'toast-top-center',
          });
          this.submitted = true;
        },
      });
  }

  getAllEquipmentsClassification() {
    this.equipmentClassificationSrv.getAllEquipmentClassification().subscribe({
      next: (data) => (this.equipmentClassifications = data),
    });
  }

  openNew() {
    this.equipmentDialog = true;
    this.dialogTitle = 'Añadir categoría'

  }

  hideDialog() {
    this.equipmentDialog = false;
    this.equipmentClassification = {} as EquipmentClassification
  }
}
