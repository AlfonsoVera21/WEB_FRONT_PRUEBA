import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/http-response.interface';
import { Departamento } from '../interfaces/model/departamento.models';

@Injectable({
  providedIn: 'root'
})
export class DepartamentoService {

  private readonly apiUrl = `${environment.BASE_URL_API}`;

  constructor(private http: HttpClient) {}

  obtenerTodosDepartamentos():Observable<ApiResponse<Departamento[]>>{
    return this.http.get<ApiResponse<Departamento[]>>(`${this.apiUrl}/departamentos`);
  }
  obtenerDepartamentoPorId(
    idDepartamento: number
  ):Observable<ApiResponse<Departamento>>{
    return this.http.get<ApiResponse<Departamento>>(`${this.apiUrl}/departamentos/${idDepartamento}`);
  }
}
