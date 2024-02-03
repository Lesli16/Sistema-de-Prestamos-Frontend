import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EquipmentSelection } from '../models/equipment-selection';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EquipmentSelectionService {
  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  getAllEquipmentSelection(): Observable<EquipmentSelection[]> {
    return this.httpClient.get<EquipmentSelection[]>(`${this.apiUrl}/equipment-selection/by-username`,{withCredentials:true});
  }

  createEquipmentSelection(equipmentSelection:EquipmentSelection): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/equipment-selection`, equipmentSelection, {withCredentials:true});
  }

  updateEquipmentSelection(equipmentSelection:EquipmentSelection): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/equipment-selection`, equipmentSelection, {withCredentials:true});
  }

  deleteEquipmentSelectionById(id: string): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/equipment-selection/${id}`, {withCredentials:true});
  }

  deleteAllEquipmentSelection(idsList: string[]): Observable<any> {
    return this.httpClient.delete(`${this.apiUrl}/equipment-selection`, {withCredentials:true,
    params:{
      ids: idsList
    }
  });
  }
}
