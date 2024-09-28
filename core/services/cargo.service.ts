import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { Cargo } from '../interfaces/model/cargo.models';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/http-response.interface';
import { Departamento } from '../interfaces/model/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class CargoService {

  private readonly apiUrl = `${environment.BASE_URL_API}`;

  constructor(private http: HttpClient) {}

  obtenerTodosCargos():Observable<ApiResponse<Cargo[]>>{
    return this.http.get<ApiResponse<Cargo[]>>(`${this.apiUrl}/cargos`);
  }
  obtenerCargoPorId(
    idCargo: number
  ):Observable<ApiResponse<Cargo>>{
    return this.http.get<ApiResponse<Departamento>>(`${this.apiUrl}/cargos/${idCargo}`);
  }
}
