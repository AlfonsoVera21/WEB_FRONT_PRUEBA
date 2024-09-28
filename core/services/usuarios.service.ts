import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../env/enviroment.development';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interfaces/http-response.interface';
import { User } from '../interfaces/model/user.models';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private readonly apiUrl = `${environment.BASE_URL_API}`;
  constructor(private http: HttpClient) { }

  obtenerTodosUsuarios():Observable<ApiResponse<User[]>>{
    return this.http.get<ApiResponse<User[]>>(`${this.apiUrl}/users`);
  }
  obtenerUsuarioPorId(
    idUsuario: number
  ):Observable<ApiResponse<User>>{
    return this.http.get<ApiResponse<User>>(`${this.apiUrl}/users/${idUsuario}`);
  }
  crearUsuario(
    usuarioCreacion: User
  ):Observable<ApiResponse<User>>{
    return this.http.post<ApiResponse<User>>(`${this.apiUrl}/users`, usuarioCreacion)
  }
  actualizarUsuario(
    usuarioActualizado: User,
    idUsuario: number
  ):Observable<ApiResponse<User>>{
    return this.http.put<ApiResponse<User>>(`${this.apiUrl}/users/${idUsuario}`, usuarioActualizado)
  }
  eliminarUsuario(
    idUsuario: number
  ):Observable<ApiResponse<User>>{
    return this.http.delete<ApiResponse<User>>(`${this.apiUrl}/users/${idUsuario}`);
  }
}
