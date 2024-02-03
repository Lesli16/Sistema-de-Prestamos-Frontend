import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Equipment } from '../models/equipment';

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {

  private apiUrl = environment.apiUrl;
  constructor(private httpClient: HttpClient) {}

  createEquipment(formData:FormData): Observable<any> {
    return this.httpClient.post(`${this.apiUrl}/equipment`, formData, {withCredentials:true});
  }

  updateEquipment(formData:FormData): Observable<any> {
    return this.httpClient.put(`${this.apiUrl}/equipment`, formData, {withCredentials:true});
  }
  getAllEquipments():Observable<Equipment[]>{
    return this.httpClient.get<Equipment[]>(`${this.apiUrl}/equipment`, {withCredentials:true});
  }

}
