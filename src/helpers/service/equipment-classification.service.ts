import { EquipmentClassification } from './../models/equipment-classification';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentClassificationService {


  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  createEquipmentClassification(equipmentClassification:EquipmentClassification): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/equipment-classification`, equipmentClassification, {withCredentials:true});
  }

  updateEquipmentClassification(equipmentClassification:EquipmentClassification): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/equipment-classification`, equipmentClassification, {withCredentials:true});
  }

  getAllEquipmentClassification(): Observable<EquipmentClassification[]> {
    return this.httpClient.get<EquipmentClassification[]>(`${this.apiUrl}/equipment-classification`, {withCredentials:true});
  }
}
