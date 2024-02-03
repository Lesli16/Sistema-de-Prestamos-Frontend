import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Equipment } from 'src/helpers/models/equipment';
import { EquipmentService } from 'src/helpers/service/equipment.service';
import { DomSanitizer } from '@angular/platform-browser';
import { EquipmentClassification } from 'src/helpers/models/equipment-classification';
import { EquipmentClassificationService } from 'src/helpers/service/equipment-classification.service';
import { NgForm } from '@angular/forms';
import { HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.scss'],
})
export class EquipmentComponent implements OnInit {
  @ViewChild('equipmentForm', { read: NgForm }) form!: NgForm;

  equipmentClassifications: EquipmentClassification[] = [];
  equipments: Equipment[] = [];
  dialog: boolean = false;
  dialogTitle: string = '';
  equipment: Equipment = {} as Equipment;
  uploadedFiles: any[] = [];
  submit: boolean = false;
  constructor(
    private equipmentSrv: EquipmentService,
    private toastSrv: ToastrService,
    private sanitizer: DomSanitizer,
    private equipmentClassificationSrv: EquipmentClassificationService
  ) {}

  ngOnInit(): void {
    this.getAllEquipments();
    this.getAllEquipmentsClassification();
  }
  handleEquipment(equipment: Equipment) {
    if (this.form.invalid) {
      this.toastSrv.error(
        'Llene todos los campos obligatorios del formulario',
        'Revise la información',
        {
          positionClass: 'toast-top-center',
        }
      );
      this.submit = true;
      return;
    }
    if (equipment.id) {
      this.editEquipment(equipment);
    } else {
      this.createEquipment(equipment);
    }
  }


  createEquipment(equipment: Equipment) {
    let formData: FormData = new FormData();
    formData.append(
      'equipment',
      new Blob([JSON.stringify(equipment)], { type: 'application/json' })
    );
    formData.append('image', this.uploadedFiles[0]);
    this.equipmentSrv.createEquipment(formData).subscribe({
      next: (data) => {
        this.toastSrv.success(data.response, 'Éxito', {
          positionClass: 'toast-top-center',
        });
        this.dialog = false;
        this.getAllEquipments();
        this.form.reset();
        this.uploadedFiles = [];
        this.submit = false;
      },
      error: (err) => {
        this.toastSrv.error(err.error.response, 'Algo salió mal', {
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  editEquipment(equipment: Equipment) {
    let formData: FormData = new FormData();
    formData.append(
      'equipment',
      new Blob([JSON.stringify(equipment)], { type: 'application/json' })
    );
    console.log(equipment)

    if (equipment.image) {
      const arrayBuffer = this.base64ToArrayBuffer(equipment.image);
      const blob = new Blob([arrayBuffer], { type: 'image/*' }); // Ajusta el tipo MIME según tu necesidad
      formData.append('image', blob);
    } else {
      formData.append('image', this.uploadedFiles[0]);
    }

    this.equipmentSrv.updateEquipment(formData).subscribe({
      next: (data) => {
        this.toastSrv.success(data.response, 'Éxito', {
          positionClass: 'toast-top-center',
        });
        this.dialog = false;
        this.getAllEquipments();
        this.form.reset();
        this.uploadedFiles = [];
        this.equipment = {} as Equipment;
        this.submit = false;
      },
      error: (err) => {
        this.toastSrv.error(err.error.response, 'Algo salió mal', {
          positionClass: 'toast-top-center',
        });
      },
    });
  }

  base64ToArrayBuffer(base64: string): ArrayBuffer {
    const binaryString = window.atob(base64);
    const length = binaryString.length;
    const bytes = new Uint8Array(length);
    for (let i = 0; i < length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }
  getAllEquipments() {
    this.equipmentSrv.getAllEquipments().subscribe({
      next: (data) => (this.equipments = data),
    });
  }

  decodeImage(base64String: string) {
    const imageUrl = `data:image/*;base64,${base64String}`;
    return this.sanitizer.bypassSecurityTrustUrl(imageUrl);
  }

  getAllEquipmentsClassification() {
    this.equipmentClassificationSrv.getAllEquipmentClassification().subscribe({
      next: (data) => (this.equipmentClassifications = data),
    });
  }

  openNew() {
    this.dialog = true;
    this.dialogTitle = 'Añadir categoría';
  }

  hideDialog() {
    this.dialog = false;
    this.equipment = {} as Equipment;
    this.form.reset();
  }

  openEditDialog(equipment: Equipment) {
    this.dialog = true;
    this.dialogTitle = 'Editar equipo';
    this.equipment = { ...equipment };
    this.uploadedFiles = [];
  }

  onSelectImage(event: any) {
    this.uploadedFiles = [];
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  editImage() {
    this.equipment.image = '';
  }
}
