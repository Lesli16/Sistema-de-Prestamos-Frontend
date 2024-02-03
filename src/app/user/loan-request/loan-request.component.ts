import { ToastrService } from 'ngx-toastr';
import { EquipmentSelectionService } from './../../../helpers/service/equipment-selection.service';
import { Component, OnInit } from '@angular/core';
import { EquipmentSelection } from 'src/helpers/models/equipment-selection';
import {
  LoanRequest,
  LoanSelectedEquipment,
} from 'src/helpers/models/loan-request';
import { LoanRequestService } from 'src/helpers/service/loan-request.service';
import { Equipment } from 'src/helpers/models/equipment';

@Component({
  selector: 'app-loan-request',
  templateUrl: './loan-request.component.html',
  styleUrls: ['./loan-request.component.scss'],
})
export class LoanRequestComponent implements OnInit {
  equipmentsSelection: EquipmentSelection[] = [];
  loanDuration: Date = new Date();
  minDate: Date = new Date();
  visible: boolean = false;

  constructor(
    private equipmentSelectionSrv: EquipmentSelectionService,
    private toastSrv: ToastrService,
    private loanRequestSrv: LoanRequestService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getAllUserEquipmentSelection();
    this.getAllLoanRequests();
  }

  getAllUserEquipmentSelection() {
    this.equipmentSelectionSrv.getAllEquipmentSelection().subscribe({
      next: (data) => (this.equipmentsSelection = data),
    });
  }

  deleteItemFromList(id: string) {
    this.equipmentSelectionSrv.deleteEquipmentSelectionById(id).subscribe({
      next: (data) => {
        this.toastSrv.success(data.response, 'Proceso exitoso!', {
          positionClass: 'toast-top-center',
        });
        this.getAllUserEquipmentSelection();
      },
    });
  }

  deleteAllItemsFromList(equipmentSelection: EquipmentSelection[]) {
    let ids: string[] = equipmentSelection.map((data) => data.id || '');
    this.equipmentSelectionSrv.deleteAllEquipmentSelection(ids).subscribe({
      next: () => {
        this.toastSrv.success(
          'Se han eliminado todos los equipos de la lista',
          '',
          {
            positionClass: 'toast-top-center',
          }
        );
        this.getAllUserEquipmentSelection();
      },
    });
  }

  createLoanRequest(equipmentSelection: EquipmentSelection[]) {
    let loanSelectedEquipment: LoanSelectedEquipment[] = [];
    equipmentSelection.forEach((data) =>
      loanSelectedEquipment.push({
        equipment: data.equipment,
        quantity: data.quantity,
      })
    );

    let loanRequest: LoanRequest = {
      selectedEquipments: loanSelectedEquipment,
      loanDuration: this.loanDuration,
    };
    this.loanRequestSrv.createLoanRequest(loanRequest).subscribe({
      next: () => (this.visible = true),
      error: (err) => {
        this.toastSrv.error(err.error.response,'',{
          timeOut: 4000,
          positionClass: 'toast-top-center',
        })
      },
    });
  }

  getAllLoanRequests() {
    this.loanRequestSrv.getAllLoanRequest().subscribe({
      next: (data) => console.log(data),
    });
  }
}
